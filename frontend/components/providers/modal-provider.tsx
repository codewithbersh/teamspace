"use client";

import { useEffect, useState } from "react";

import TeamSpaceModal from "@/components/modals/teamspace-modal";
import AcceptMemberModal from "@/components/modals/accept-member-modal";
import RemoveMemberModal from "@/components/modals/remove-member-modal";
import UpdateRoleModal from "@/components/modals/update-role-modal";

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
    </>
  );
};

export default ModalProvider;
