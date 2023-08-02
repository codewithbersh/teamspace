"use client";

import DialogModal from "./dialog-modal";

import { useTeamSpaceModal } from "@/hooks/use-teamspace-modal";

const TeamSpaceModal = () => {
  const teamSpaceModal = useTeamSpaceModal();
  return (
    <DialogModal
      title="a"
      description="a"
      onClose={teamSpaceModal.onClose}
      isOpen={teamSpaceModal.isOpen}
    >
      TeamSpaceModal
    </DialogModal>
  );
};

export default TeamSpaceModal;
