"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useCommentModal } from "@/hooks/use-comment-modal";

import { deleteComment, updateComment } from "@/lib/axios/comment";
import { GetMembersType } from "@/lib/axios/member";
import { Comment, Ticket } from "@/types";
import { Dot, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Props = {
  comment: Comment;
  member: GetMembersType;
  access: string;
  ticketStatus: Ticket["status"];
};

const Comment = ({ comment, member, access, ticketStatus }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    isOpen,
    setIsOpen,
    comment: GlobalComment,
    setComment,
  } = useCommentModal();

  const commentedBy = `${comment.member_detail.user.first_name} ${comment.member_detail.user.last_name}`;
  const userIsOwner = comment.member === member.id;
  const h1Text = userIsOwner ? "You" : commentedBy;
  const deletedText = userIsOwner
    ? `Your comment is hidden.`
    : `${commentedBy}'s comment has been hidden`;

  const optionsDisabled = ticketStatus === "CO" && member.role === "NA";

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: deleteComment,
  });

  const { mutate: hideCommentMutate } = useMutation({
    mutationFn: updateComment,
  });

  const handleSelectEdit = () => {
    setIsOpen(true);
    setComment(comment);
  };

  const handleSelectDelete = () => {
    deleteCommentMutate(
      {
        access,
        commentId: comment.id,
      },
      {
        onSuccess: (value) => {
          if (value) {
            toast({
              description: "Your comment has been deleted.",
            });
            router.refresh();
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        },
      }
    );
  };

  const handleSelectHide = () => {
    hideCommentMutate(
      {
        access,
        commentId: comment.id,
        comment: {
          has_been_deleted: !comment.has_been_deleted,
        },
      },
      {
        onSuccess: (value) => {
          if (value) {
            toast({
              description: value.has_been_deleted
                ? "Your comment has been hidden."
                : "Your comment is now visible.",
            });
            router.refresh();
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={comment.member_detail.user.image_url} />
        <AvatarFallback className="text-base font-bold">
          {comment.member_detail.user.email[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <Card className="w-full min-w-[300px]">
        <CardHeader className="p-4 space-y-0.5">
          {comment.has_been_deleted ? (
            <p className="text-muted-foreground">{deletedText}</p>
          ) : (
            <>
              <div className="flex items-end ">
                <h1 className="leading-none">{h1Text}</h1>
                {comment.has_been_edited && (
                  <>
                    <Dot size={16} className="h-[14px]" />
                    <p className="leading-none text-muted-foreground text-xs tracking-tighter">
                      Edited
                    </p>
                  </>
                )}
                <small className="ml-auto leading-none text-xs text-muted-foreground tracking-tighter">
                  {formatDistanceToNow(new Date(comment.created), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}
                </small>
              </div>
              <p className="text-muted-foreground">{comment.description}</p>
            </>
          )}
        </CardHeader>
      </Card>
      <div className="w-10 h-10 shrink-0">
        {userIsOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={optionsDisabled}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Comment Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={comment.has_been_deleted}
                onSelect={() => handleSelectEdit()}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelectHide()}>
                {comment.has_been_deleted ? "Show" : "Hide"}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelectDelete()}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export { Comment };
