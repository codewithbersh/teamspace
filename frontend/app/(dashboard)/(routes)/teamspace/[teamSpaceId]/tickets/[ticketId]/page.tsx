import { notFound, redirect } from "next/navigation";

import { TicketInformationSummary } from "@/components/dashboard/tickets/ticket-information-summary";
import { PageHeader } from "@/components/dashboard/page-header";
import { TicketInformationTable } from "@/components/dashboard/tickets/ticket-information-table";
import { TicketOptionsDropdown } from "@/components/dashboard/tickets/ticket-options-dropdown";
import { AlertTicketArchived } from "@/components/dashboard/tickets/alert-ticket-archived";

import { getTicketInformation } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";
import { getMember } from "@/lib/axios/member";

type Props = {
  params: {
    ticketId: string;
    teamSpaceId: string;
  };
};

const TicketInformationPage = async ({
  params: { ticketId, teamSpaceId },
}: Props) => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const access = session.user.backendSession.access;

  const ticket = await getTicketInformation({
    access,
    ticketId,
  });

  const member = await getMember({
    teamSpaceId,
    access,
    userId: session.user.backendSession.user.id,
  });

  if (!ticket) notFound();
  if (!member) redirect(`/teamspace/${teamSpaceId}`);

  return (
    <div className="container space-y-12">
      <PageHeader
        title="Ticket Information"
        description="View and update ticket"
      >
        {member.role !== "NA" && <TicketOptionsDropdown ticket={ticket} />}
      </PageHeader>

      <AlertTicketArchived ticket={ticket} member={member} />

      <TicketInformationSummary ticket={ticket} member={member} />
      <TicketInformationTable
        ticket={ticket}
        member={member}
        access={access}
        teamSpaceId={teamSpaceId}
      />
    </div>
  );
};

export default TicketInformationPage;
