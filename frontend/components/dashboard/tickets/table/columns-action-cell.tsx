"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { Ticket } from "@/types";

type Props = {
  row: Row<Ticket>;
};

export function ColumnsActionCell({ row }: Props) {
  const router = useRouter();
  const ticket = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => router.push(`tickets/${ticket.id}`)}>
          View details
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => router.push(`tickets/form?ticketId=${ticket.id}`)}
        >
          Edit ticket
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
