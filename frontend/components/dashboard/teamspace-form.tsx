"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Loader2 } from "lucide-react";
import { teamSpaceSchema } from "@/lib/schema";
import { createTeamSpace } from "@/lib/axios/teamspace";
import { createMember } from "@/lib/axios/member";
import { useTeamSpaceModal } from "@/hooks/use-teamspace-modal";

type FormType = z.infer<typeof teamSpaceSchema>;
type Props = {};

const TeamSpaceForm = ({}: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const teamSpaceModal = useTeamSpaceModal();

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: newTeamSpace } = useMutation({
    mutationFn: createTeamSpace,
  });

  const { mutate: newMember } = useMutation({
    mutationFn: createMember,
  });

  const form = useForm<FormType>({
    resolver: zodResolver(teamSpaceSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: FormType) {
    setIsLoading(true);
    if (!session) redirect("/login");

    newTeamSpace(
      {
        access: session.user.backendSession.access,
        teamSpace: {
          name: values.name,
          created_by: session.user.backendSession.user.pk,
        },
      },
      {
        onSuccess: (values) => {
          setIsLoading(false);
          if (!values) {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          } else {
            newMember({
              access: session.user.backendSession.access,
              member: {
                user: values.created_by,
                team_space: values.id,
                role: "SU",
                is_verified: true,
              },
            });

            form.reset();
            toast({
              description: "Team Space created successfully.",
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
          Create a team space
        </h1>
        <p className="text-muted-foreground">
          Start and create a new space for your team
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a team space name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>You can change this later</FormDescription>
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
              {isLoading ? "Creating" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TeamSpaceForm;
