"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Member } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { translateMemberRole } from "@/lib/utils";
import { ColumnsActionCell } from "./columns-action-cell";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "is_verified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const is_verified = row.original.is_verified;
      const formatted = is_verified ? "Active" : "Pending";
      return formatted;
    },
  },
  {
    id: "email",
    accessorKey: "user_detail.email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user_detail.first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user_detail;
      const first_name = user.first_name;
      const last_name = user.last_name;
      return `${first_name} ${last_name}`;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const member = row.original;
      const role = translateMemberRole(member.role);

      return member.is_verified ? role : "Pending";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnsActionCell row={row} />,
  },
];
