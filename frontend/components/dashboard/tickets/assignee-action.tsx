"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { Member } from "@/types";
import { Check, Loader2, Users } from "lucide-react";
import { addAssignees } from "@/lib/axios/assignee";

type AssigneeActionProps = {
  assignees: Member[];
  members: Member[];
  ticketId: string;
  access: string;
};

export function AssigneeAction({
  assignees,
  members,
  ticketId,
  access,
}: AssigneeActionProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMembers, setSelectedMembers] =
    React.useState<Member[]>(assignees);
  const router = useRouter();

  const { toast } = useToast();

  React.useEffect(() => {
    setSelectedMembers(assignees);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { mutate, isLoading } = useMutation({
    mutationFn: addAssignees,
  });

  const onSubmit = () => {
    const assignees = selectedMembers.map((member) => {
      return { member: member.id, ticket: ticketId };
    });
    mutate(
      {
        access,
        assignees,
        ticketId,
      },
      {
        onSuccess: (values) => {
          if (values === null) {
            toast({
              title: "Uh oh! Something went wrong.",
              description:
                "There was a problem with your request. Please try again later.",
            });
          } else {
            toast({
              description: "Assignee updated successfully.",
            });
            router.refresh();
            setOpen(false);
          }
        },
      }
    );
  };

  const buttonText = isLoading ? "Saving Changes" : "Save Changes";

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto gap-2"
            onClick={() => setOpen(true)}
          >
            <Users className="h-4 w-4" />
            Manage assignees
          </Button>
        </DialogTrigger>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Manage assignees</DialogTitle>
            <DialogDescription>
              Assign team space members to this ticket.
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {members.map((member) => (
                  <CommandItem
                    key={member.user_detail.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (
                        selectedMembers.some(
                          (selected) =>
                            selected.user_detail.email ===
                            member.user_detail.email
                        )
                      ) {
                        return setSelectedMembers(
                          selectedMembers.filter(
                            (selectedMember) =>
                              selectedMember.user_detail.email !==
                              member.user_detail.email
                          )
                        );
                      }

                      return setSelectedMembers([...selectedMembers, member]);
                    }}
                  >
                    <Avatar>
                      <AvatarImage
                        src={member.user_detail.image_url}
                        alt="Image"
                      />
                      <AvatarFallback>
                        {member.user_detail.email[0].toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {member.user_detail.first_name}{" "}
                        {member.user_detail.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.user_detail.email}
                      </p>
                    </div>
                    {selectedMembers.some(
                      (selected) =>
                        selected.user_detail.email === member.user_detail.email
                    ) ? (
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedMembers.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedMembers.map((member) => (
                  <Avatar
                    key={member.user_detail.email}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={member.user_detail.image_url} />
                    <AvatarFallback>
                      {member.user_detail.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select members to add to this ticket.
              </p>
            )}
            <Button
              onClick={() => onSubmit()}
              className="gap-2"
              disabled={isLoading}
            >
              {isLoading && (
                <Loader2 className="w-[14px] h-[14px] animate-spin" />
              )}
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
