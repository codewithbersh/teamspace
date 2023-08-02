"use client";

import { useEffect, useState } from "react";

import TeamSpaceModal from "@/components/modals/teamspace-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <TeamSpaceModal />
    </>
  );
};

export default ModalProvider;
