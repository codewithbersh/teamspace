"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  cn,
  translateTicketPriority,
  translateTicketStatus,
  translateTicketType,
} from "@/lib/utils";
import { Ticket } from "@/types";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Ticket>[] = [
  {
    id: "Ticket ID",
    accessorKey: "ticket_id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const code = row.original.type;
      const formatted = translateTicketType(code);

      return (
        <div className="flex space-x-2 items-center">
          <Badge variant="outline" className="shrink-0">
            {formatted}
          </Badge>
          <span className="min-w-[300px] line-clamp-1 max-w-[350px] font-medium">
            {row.original.title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const code = row.original.status;
      const formatted = translateTicketStatus(code);
      return (
        <div className="min-w-[100px]">
          <div
            className={cn(
              "inline-flex items-center px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              code === "PE" && "bg-slate-50 text-slate-600",
              code === "IP" && "bg-blue-50 text-blue-600",
              code === "CO" && "bg-green-50 text-green-600",
              code === "FR" && "bg-yellow-50 text-yellow-600"
            )}
          >
            {formatted}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      const assignees = row.original.assigned_members;

      if (!assignees || assignees.length === 0)
        return <div className="h-10 flex items-center">No assignee.</div>;

      return (
        <div className="flex items-center">
          {assignees.slice(0, 3).map((member, index) => (
            <Avatar
              key={member.id}
              className={cn(
                index === 1 && "-translate-x-1/3",
                index === 2 && "-translate-x-2/3",
                "bg-blue-100 border border-white"
              )}
            >
              <AvatarImage src={member.user_detail.image_url} />
              <AvatarFallback className="font-bold text-base">
                {member.user_detail.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
          {assignees.length > 3 && (
            <p className="-translate-x-1/3 text-sm text-muted-foreground font-medium">
              +{assignees.length - 3} more
            </p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const code = row.original.priority;
      const formatted = translateTicketPriority(code);

      return (
        <div className="min-w-[100px]">
          <div
            className={cn(
              "inline-flex items-center px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              code === "IM" && "bg-rose-500 text-white",
              code === "HI" && "bg-rose-100 text-rose-900",
              code === "MD" && "bg-yellow-100 text-yellow-900",
              code === "LW" && "bg-slate-100 text-slate-900"
            )}
          >
            {formatted}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem
              onSelect={() => router.push(`tickets/${ticket.id}`)}
            >
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
    },
  },
];
