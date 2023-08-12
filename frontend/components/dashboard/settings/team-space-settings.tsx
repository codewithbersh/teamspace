"use client";

import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

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
import DeleteTeamSpaceDialog from "./delete-teamspace-dialog";

import { teamSpaceSchema } from "@/lib/schema";
import { updateTeamSpace } from "@/lib/axios/teamspace";
import { Member, TeamSpace } from "@/types";

type FormType = z.infer<typeof teamSpaceSchema>;

type Props = {
  teamSpace: TeamSpace;
  session: Session;
  member: Member;
};

const TeamSpaceSettings = ({ teamSpace, session, member }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: updateTeamSpace,
  });

  const form = useForm<z.infer<typeof teamSpaceSchema>>({
    resolver: zodResolver(teamSpaceSchema),
    defaultValues: {
      name: teamSpace.name,
    },
    mode: "onChange",
  });

  const isEdited = !form.formState.isDirty;

  function onSubmit(values: FormType) {
    mutate(
      {
        access: session.user.backendSession.access,
        teamSpaceId: teamSpace.id,
        name: values.name,
      },
      {
        onSuccess: (formValues) => {
          if (formValues) {
            form.reset();
            form.setValue("name", formValues.name);
            router.refresh();
            toast({
              description: "Team space name has been updated.",
            });
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

  return (
    <div className="max-w-[400px] space-y-8">
      <div className="space-y-1">
        <h1 className="font-bold  sm:text-2xl !leading-none">Team Space</h1>
        <p className="text-sm text-muted-foreground">
          Manage team space settings
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
                  <Input placeholder="Add team space name" {...field} />
                </FormControl>
                <FormDescription>Update team space name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isEdited}>
            Save changes
          </Button>
        </form>
      </Form>

      {member.role === "SU" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-sm font-medium leading-none">
              Delete Team Space
            </h1>
            <p className="text-sm text-muted-foreground">
              This is a danger zone.
            </p>
          </div>

          <DeleteTeamSpaceDialog
            access={session.user.backendSession.access}
            teamSpaceId={teamSpace.id}
          />
        </div>
      )}
    </div>
  );
};

export { TeamSpaceSettings };
