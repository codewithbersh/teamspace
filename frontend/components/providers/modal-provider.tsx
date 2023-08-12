"use client";

import { useEffect, useState } from "react";

import TeamSpaceModal from "@/components/modals/teamspace-modal";
import AcceptMemberModal from "@/components/modals/accept-member-modal";
import RemoveMemberModal from "@/components/modals/remove-member-modal";

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
    </>
  );
};

export default ModalProvider;
