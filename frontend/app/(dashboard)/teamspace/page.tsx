"use client";

import { useEffect } from "react";

import { useTeamSpaceModal } from "@/hooks/use-teamspace-modal";

const DashboardPage = () => {
  const onOpen = useTeamSpaceModal((state) => state.onOpen);
  const isOpen = useTeamSpaceModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <></>;
};

export default DashboardPage;
