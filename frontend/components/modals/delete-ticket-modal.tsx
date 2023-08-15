import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

import { DialogModal } from "./dialog-modal";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { deleteTicket } from "@/lib/axios/ticket";
import { useDeleteTicketModal } from "@/hooks/use-delete-ticket-modal";
import { DEMO_TICKETS } from "@/lib/demo-tickets";
import { AlertCircle, Loader2 } from "lucide-react";

const DeleteTicketModal = () => {
  const { onClose, isOpen, ticket, setTicket } = useDeleteTicketModal();
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
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

  const isDemoTicket = DEMO_TICKETS.includes(ticket.id);

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
      <div className="pt-2 space-y-6">
        {isDemoTicket && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You are attempting to delete a demo ticket. Demo tickets are not
              deletable.
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleSelectCancel()}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleSelectAccept()}
            disabled={isDemoTicket || isLoading}
            className="gap-2"
          >
            {isLoading && (
              <Loader2 className="w-[14px] h-[14px] animate-spin" />
            )}
            {acceptButtonText}
          </Button>
        </DialogFooter>
      </div>
    </DialogModal>
  );
};

export default DeleteTicketModal;
