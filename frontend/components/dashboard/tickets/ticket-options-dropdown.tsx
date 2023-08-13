"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Archive, Pencil, Settings2, Trash } from "lucide-react";
import { Ticket } from "@/types";
import { useArchiveTicketModal } from "@/hooks/use-archive-ticket-modal";
import { useDeleteTicketModal } from "@/hooks/use-delete-ticket-modal";

type Props = {
  ticket: Ticket;
};

const TicketOptionsDropdown = ({ ticket }: Props) => {
  const { onOpen, setTicket } = useArchiveTicketModal();
  const { onOpen: onOpenDelete, setTicket: setTicketDelete } =
    useDeleteTicketModal();
  const router = useRouter();
  const handleEditSelect = () => {
    router.push(`/teamspace/${ticket.team_space}/tickets`, {});
  };

  const handleArchiveSelect = () => {
    setTicket(ticket);
    onOpen();
  };

  const handleDeleteSelect = () => {
    setTicketDelete(ticket);
    onOpenDelete();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 items-center">
          <Settings2 className="w-4 h-4" /> Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Manage Ticket</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-3"
          onSelect={() => handleEditSelect()}
          asChild
        >
          <Link
            href={{
              pathname: `/teamspace/${ticket.team_space}/tickets/form`,
              query: {
                ticketId: ticket.id,
              },
            }}
          >
            <Pencil className="w-[14px] h-[14px] text-muted-foreground" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-3"
          onSelect={() => handleArchiveSelect()}
        >
          <Archive className="w-[14px] h-[14px] text-muted-foreground" />
          {ticket.archived ? "Restore" : "Archive"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-3"
          onSelect={() => handleDeleteSelect()}
        >
          <Trash className="w-[14px] h-[14px] text-muted-foreground" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketOptionsDropdown };
