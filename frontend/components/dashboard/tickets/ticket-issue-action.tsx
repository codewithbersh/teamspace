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
import { Member, Ticket } from "@/types";
import { getOptions } from "@/lib/utils";

type Props = {
  ticket: Ticket;
  access: string;
  member: Member;
};

const TicketIssueAction = ({ ticket, access, member }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const selectOptions = getOptions(member.role);

  const { mutate } = useMutation({
    mutationFn: updateTicketStatus,
  });

  const isUserAssigned = ticket.assigned_members.find(
    (user) => user.id === member.id
  );
  const disabled = isUserAssigned
    ? ticket.status === "CO" && member.role === "NA"
    : true;

  const handleSelectStatus = (selectedStatus: Ticket["status"]) => {
    mutate(
      {
        access: access,
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
      onValueChange={(selectedStatus: Ticket["status"]) =>
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
