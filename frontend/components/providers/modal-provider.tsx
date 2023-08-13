"use client";

import { useEffect, useState } from "react";

import TeamSpaceModal from "@/components/modals/teamspace-modal";
import AcceptMemberModal from "@/components/modals/accept-member-modal";
import RemoveMemberModal from "@/components/modals/remove-member-modal";
import UpdateRoleModal from "@/components/modals/update-role-modal";
import ArchiveTicketModal from "@/components/modals/archive-ticket-modal";
import DeleteTicketModal from "@/components/modals/delete-ticket-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <TeamSpaceModal />
      <AcceptMemberModal />
      <RemoveMemberModal />
      <UpdateRoleModal />
      <ArchiveTicketModal />
      <DeleteTicketModal />
    </>
  );
};

export default ModalProvider;
