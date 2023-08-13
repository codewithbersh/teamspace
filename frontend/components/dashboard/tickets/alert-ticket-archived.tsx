import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircle, Info } from "lucide-react";
import { Member, Ticket } from "@/types";

type Props = {
  ticket: Ticket;
  member: Member;
};

const AlertTicketArchived = ({ ticket, member }: Props) => {
  if (!ticket.archived) return null;

  if (member.role === "NA") {
    return (
      <Alert variant="destructive" className="max-w-fit">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Archived Ticket Access</AlertTitle>
        <AlertDescription className="max-w-prose">
          This ticket has been archived. Archived tickets are no longer active
          and are only accessible to administrators. If you need to restore
          access, please contact an administrator.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="max-w-fit">
      <Info className="h-4 w-4" />
      <AlertTitle>Archived Ticket Information</AlertTitle>
      <AlertDescription className="leading-normal mt-2 text-muted-foreground max-w-prose">
        You are currently viewing an archived ticket. Archived tickets are no
        longer active and are retained for reference purposes. If you need to
        restore this ticket, you can do so through the ticket management
        options.
      </AlertDescription>
    </Alert>
  );
};

export { AlertTicketArchived };
