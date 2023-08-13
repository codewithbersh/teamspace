import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

import { DialogModal } from "./dialog-modal";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useArchiveTicketModal } from "@/hooks/use-archive-ticket-modal";
import { archiveTicket } from "@/lib/axios/ticket";

const ArchiveTicketModal = () => {
  const { onClose, isOpen, ticket, setTicket } = useArchiveTicketModal();
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: archiveTicket,
  });
  if (!ticket) return null;

  const handleSelectCancel = () => {
    onClose();
    setTimeout(() => {
      setTicket(undefined);
    }, 1000);
  };

  const title = ticket.archived
    ? "Restore Ticket from Archive"
    : "Archive Ticket";
  const description = ticket.archived
    ? "By restoring this ticket from the archive, it will become visible to the public again, allowing for further actions and discussions."
    : "Archived tickets can be accessed later if needed, but won't be prominently displayed.";

  const acceptButtonText = ticket.archived ? "Restore" : "Archive";

  const handleSelectAccept = () => {
    if (!session) redirect("/login");
    mutate(
      {
        access: session.user.backendSession.access,
        ticketId: ticket.id,
        archived: !ticket.archived,
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
            router.refresh();
            toast({
              description: values.archived
                ? "Ticket has been archived successfully."
                : "Ticket has been restored successfully.",
            });
            onClose();
            if (values.archived) {
              router.push(`/teamspace/${ticket.team_space}/tickets`);
            }
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
          <Button onClick={() => handleSelectAccept()}>
            {acceptButtonText}
          </Button>
        </DialogFooter>
      </div>
    </DialogModal>
  );
};

export default ArchiveTicketModal;
