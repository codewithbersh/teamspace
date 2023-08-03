"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { Loader2 } from "lucide-react";
import { useTeamSpaceModal } from "@/hooks/use-teamspace-modal";
import { joinTeamSpaceSchema } from "@/lib/schema";
import { joinTeamSpace } from "@/lib/axios/member";

type FormType = z.infer<typeof joinTeamSpaceSchema>;

type Props = {};

const JoinTeamSpaceForm = ({}: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const teamSpaceModal = useTeamSpaceModal();

  const { data: session } = useSession();

  const { mutate } = useMutation({
    mutationFn: joinTeamSpace,
  });

  const form = useForm<FormType>({
    resolver: zodResolver(joinTeamSpaceSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: FormType) {
    setIsLoading(true);
    if (!session) redirect("/login");

    mutate(
      {
        access: session.user.backendSession.access,
        code: values.code,
        user: session.user.backendSession.user.pk,
      },
      {
        onSuccess: (values) => {
          setIsLoading(false);
          if (values) {
            if ("error" in values) {
              toast({
                title: "Uh oh! Something went wrong.",
                description: values.error,
              });
            } else {
              toast({
                title: "Your request has been submitted",
              });
              form.reset();
            }
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        },
      }
    );
  }

  return (
    <>
      <div className="flex flex-col gap-[6px]">
        <h1 className="leading-none text-lg font-semibold tracking-tight">
          Join a team space
        </h1>
        <p className="text-muted-foreground">Join an existing team space.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a team space name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  You can get the invitation code from the team space admin
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 w-full">
            <Button
              variant="outline"
              type="button"
              onClick={() => teamSpaceModal.onClose()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-[6px]">
              {isLoading && (
                <Loader2 className="w-[14px] h-[14px] animate-spin" />
              )}
              {isLoading ? "Requesting" : "Submit request"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export { JoinTeamSpaceForm };
