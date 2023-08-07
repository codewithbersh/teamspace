"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import { updateTicketStatus } from "@/lib/axios/ticket";
import { GetMembersType } from "@/lib/axios/member";
import { BackendSession, TicketDetailed } from "@/types";
import { getOptions } from "@/lib/utils";

type Props = {
  ticket: TicketDetailed;
  backendSession: BackendSession;
  teamSpaceMembers: GetMembersType[];
};

const TicketIssueAction = ({
  ticket,
  backendSession,
  teamSpaceMembers,
}: Props) => {
  const currentUser = backendSession.user;
  const member = teamSpaceMembers.find(
    (member) => member.user.id === currentUser.pk
  )!;
  const { toast } = useToast();
  const router = useRouter();

  const selectOptions = getOptions(member.role);

  const { mutate } = useMutation({
    mutationFn: updateTicketStatus,
  });

  const disabled = member.role === "NA" && ticket.status === "CO";

  const handleSelectStatus = (selectedStatus: TicketDetailed["status"]) => {
    mutate(
      {
        access: backendSession.access,
        ticketId: ticket.id,
        status: selectedStatus,
      },
      {
        onSuccess: (value) => {
          if (!value) {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          } else {
            toast({
              description: "Ticket updated successfully.",
            });
            router.refresh();
          }
        },
      }
    );
  };

  return (
    <Select
      defaultValue={ticket.status}
      onValueChange={(selectedStatus: TicketDetailed["status"]) =>
        handleSelectStatus(selectedStatus)
      }
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px] ml-auto">
        <span className="text-muted-foreground">Status: </span>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map((option) => (
          <SelectItem
            className={option.hidden ? "hidden" : ""}
            value={option.value}
            key={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { TicketIssueAction };
