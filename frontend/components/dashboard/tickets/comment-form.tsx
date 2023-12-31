"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { ticketCommentSchema } from "@/lib/schema";
import { addComment, updateComment } from "@/lib/axios/comment";
import { Loader2, MessageSquarePlus } from "lucide-react";
import { useCommentModal } from "@/hooks/use-comment-modal";
import { Member, Ticket } from "@/types";

type FormType = z.infer<typeof ticketCommentSchema>;

type Props = {
  access: string;
  member: Member;
  ticketId: string;
  ticketStatus: Ticket["status"];
  assignedMembers: Member[];
};

const CommentForm = ({
  access,
  member,
  ticketId,
  ticketStatus,
  assignedMembers,
}: Props) => {
  const { isOpen, setIsOpen, comment, setComment } = useCommentModal();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormType>({
    resolver: zodResolver(ticketCommentSchema),
    defaultValues: {
      description: comment?.description || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (comment) {
      form.setValue("description", comment.description);
    } else {
      form.setValue("description", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  const { mutate: addCommentMutate, isLoading: isCreatingComment } =
    useMutation({
      mutationFn: addComment,
    });

  const { mutate: updateCommentMutate, isLoading: isUpdatingComment } =
    useMutation({
      mutationFn: updateComment,
    });

  function onSubmit(values: FormType) {
    const newComment = {
      ...values,
      member: member.id,
      ticket: ticketId,
    };
    if (!comment) {
      addCommentMutate(
        { access, comment: newComment },
        {
          onSuccess: (data) => {
            if (data) {
              setIsOpen(false);
              toast({
                description: "Comment added successfully.",
              });
              router.refresh();
            } else {
              toast({
                title: "Uh oh! Something went wrong.",
                description:
                  "There was a problem with your request. Please try again later.",
              });
            }
          },
        }
      );
    } else {
      updateCommentMutate(
        {
          access,
          commentId: comment.id,
          comment: { description: values.description, has_been_edited: true },
        },
        {
          onSuccess: (value) => {
            if (value) {
              setIsOpen(false);
              toast({
                description: "Comment updated successfully.",
              });
              router.refresh();
            } else {
              toast({
                title: "Uh oh! Something went wrong.",
                description:
                  "There was a problem with your request. Please try again later.",
              });
            }
          },
        }
      );
    }
  }

  const handleOnOpenChange = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setComment(undefined);
    }
  };

  const buttonText = comment
    ? isUpdatingComment
      ? "Saving Changes"
      : "Save Changes"
    : isCreatingComment
    ? "Creating Comment"
    : "Create Comment";
  const formLabelText = comment ? "Edit comment" : "Add comment";
  const isUserAssigned = assignedMembers.find((user) => user.id === member.id);
  const disabled = member.role !== "NA" ? false : isUserAssigned ? false : true;

  return (
    <Dialog open={isOpen} onOpenChange={() => handleOnOpenChange()}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="gap-2"
          disabled={disabled}
        >
          <MessageSquarePlus className="w-[14px] h-[14px]" /> Add comment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formLabelText}</FormLabel>
                    <FormControl>
                      <Input placeholder="Add your comment here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full">
                <Button
                  type="submit"
                  className="ml-auto gap-2"
                  disabled={isCreatingComment || isUpdatingComment}
                >
                  {(isCreatingComment || isUpdatingComment) && (
                    <Loader2 className="w-[14px] h-[14px] animate-spin" />
                  )}
                  {buttonText}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { CommentForm };
