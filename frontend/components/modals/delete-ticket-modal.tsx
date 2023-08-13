import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

import { DialogModal } from "./dialog-modal";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { deleteTicket } from "@/lib/axios/ticket";
import { useDeleteTicketModal } from "@/hooks/use-delete-ticket-modal";

const DeleteTicketModal = () => {
  const { onClose, isOpen, ticket, setTicket } = useDeleteTicketModal();
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: deleteTicket,
  });
  if (!ticket) return null;

  const handleSelectCancel = () => {
    onClose();
    setTimeout(() => {
      setTicket(undefined);
    }, 1000);
  };

  const title = "Confirm Ticket Deletion";
  const description =
    "This action will result in the permanent removal of the ticket, including its complete history and associated comments. Are you certain you wish to proceed?";

  const acceptButtonText = "Yes, Delete";

  const handleSelectAccept = () => {
    if (!session) redirect("/login");
    mutate(
      {
        access: session.user.backendSession.access,
        ticketId: ticket.id,
      },
      {
        onSuccess: (values) => {
          if (!values) {
            toast({
              title: "Uh oh! Something went wrong.",
              description:
                "There was a problem with your request. Please try again later.",
            });
          } else {
            toast({
              description: "Ticket has been deleted successfully.",
            });
            onClose();
            router.push(`/teamspace/${ticket.team_space}/tickets`);
            router.refresh();
          }
        },
      }
    );
  };
  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="pt-2">
        <DialogFooter>
          <Button variant="outline" onClick={() => handleSelectCancel()}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => handleSelectAccept()}>
            {acceptButtonText}
          </Button>
        </DialogFooter>
      </div>
    </DialogModal>
  );
};

export default DeleteTicketModal;
