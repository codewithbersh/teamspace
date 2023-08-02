"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DialogModal from "./dialog-modal";

import { useTeamSpaceModal } from "@/hooks/use-teamspace-modal";

import TeamSpaceForm from "@/components/dashboard/teamspace-form";

const TeamSpaceModal = () => {
  const teamSpaceModal = useTeamSpaceModal();
  return (
    <DialogModal
      onClose={teamSpaceModal.onClose}
      isOpen={teamSpaceModal.isOpen}
    >
      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="create" className="w-1/2">
            Create
          </TabsTrigger>
          <TabsTrigger value="join" className="w-1/2">
            Join
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="!ring-0 space-y-4">
          <TeamSpaceForm />
        </TabsContent>
        <TabsContent value="join">Change your password here.</TabsContent>
      </Tabs>
    </DialogModal>
  );
};

export default TeamSpaceModal;
