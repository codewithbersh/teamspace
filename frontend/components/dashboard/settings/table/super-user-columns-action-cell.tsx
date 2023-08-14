"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUpdateRoleModal } from "@/hooks/use-update-role-modal";
import { useAcceptMemberModal } from "@/hooks/use-accept-member-modal";
import { useRemoveMemberModal } from "@/hooks/use-remove-member-modal";
import { Member } from "@/types";
import { MoreHorizontal } from "lucide-react";

type Props = {
  row: Row<Member>;
};

export function SuperUserColumnsActionCell({ row }: Props) {
  const { onOpen, setMember } = useAcceptMemberModal();
  const { onOpen: onOpenRemove, setMember: setMemberRemove } =
    useRemoveMemberModal();
  const { onOpen: onOpenUpdate, setMember: setMemberUpdate } =
    useUpdateRoleModal();
  const isAdmin = row.original.role === "SU";
  const isPending = !row.original.is_verified;
  const handleSelectAcceptMember = () => {
    setMember(row.original);
    onOpen();
  };
  const handleSelectRemoveMember = () => {
    setMemberRemove(row.original);
    onOpenRemove();
  };
  const handleSelectAdmin = () => {
    setMemberUpdate(row.original);
    onOpenUpdate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
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
        <DropdownMenuSeparator className={isAdmin ? "hidden" : ""} />
        <DropdownMenuItem
          disabled={isAdmin || !row.original.is_verified}
          onSelect={() => handleSelectAdmin()}
          className={isAdmin ? "hidden" : ""}
        >
          {row.original.role === "NA"
            ? "Make admin"
            : row.original.role === "AD"
            ? "Remove admin"
            : ""}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
