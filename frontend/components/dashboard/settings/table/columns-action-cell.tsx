"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAcceptMemberModal } from "@/hooks/use-accept-member-modal";
import { useRemoveMemberModal } from "@/hooks/use-remove-member-modal";
import { MoreHorizontal } from "lucide-react";
import { Member } from "@/types";
import { DEMO_ACCOUNTS } from "@/lib/demo-tickets";

type Props = {
  row: Row<Member>;
};

export function ColumnsActionCell({ row }: Props) {
  const { onOpen, setMember } = useAcceptMemberModal();
  const { onOpen: onOpenRemove, setMember: setMemberRemove } =
    useRemoveMemberModal();

  const isAdmin = row.original.role === "AD" || row.original.role === "SU";
  const isPending = !row.original.is_verified;

  const handleSelectAcceptMember = () => {
    setMember(row.original);
    onOpen();
  };

  const handleSelectRemoveMember = () => {
    setMemberRemove(row.original);
    onOpenRemove();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={isAdmin}
          onSelect={() => handleSelectAcceptMember()}
        >
          {isPending ? "Accept member" : "Mark as pending"}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isAdmin}
          onSelect={() => handleSelectRemoveMember()}
        >
          {isPending ? "Remove request" : "Remove member"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
