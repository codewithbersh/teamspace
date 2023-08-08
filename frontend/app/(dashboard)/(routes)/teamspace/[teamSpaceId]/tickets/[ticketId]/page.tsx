import { redirect } from "next/navigation";
import Link from "next/link";

import { TicketInformationSummary } from "@/components/dashboard/tickets/ticket-information-summary";
import { PageHeader } from "@/components/dashboard/page-header";
import { buttonVariants } from "@/components/ui/button";
import { TicketInformationTable } from "@/components/dashboard/tickets/ticket-information-table";

import { getTeamSpace } from "@/lib/axios/teamspace";
import { getTicketInformation } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { getTeamSpaceMembers } from "@/lib/axios/member";
import { getTicketComments } from "@/lib/axios/comment";

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
  const teamSpace = await getTeamSpace({ access, teamSpaceId });
  if (!teamSpace) redirect("/teamspace");
  const ticket = await getTicketInformation({
    access,
    ticketId,
  });
  if (!ticket) redirect(`/teamspace/${teamSpaceId}/tickets`);
  const teamSpaceMembers = await getTeamSpaceMembers({ access, teamSpaceId });
  if (!teamSpaceMembers) redirect(`/teamspace/${teamSpaceId}`);
  const member = teamSpaceMembers.find(
    (member) => member.user.id === session.user.backendSession.user.pk
  );

  if (!member) redirect("/teamspace");
  const comments = await getTicketComments({ access, ticketId });
  return (
    <div className="container space-y-12">
      <PageHeader
        title="Ticket Information"
        description="View and update ticket"
      >
        {member.role !== "NA" && (
          <Link
            href={{
              pathname: `/teamspace/${teamSpaceId}/tickets/form`,
              query: {
                ticketId: ticketId,
              },
            }}
            className={cn(buttonVariants(), "min-w-[99.14px]")}
          >
            Edit ticket
          </Link>
        )}
      </PageHeader>

      <TicketInformationSummary ticket={ticket} />
      <TicketInformationTable
        ticket={ticket}
        backendSession={session.user.backendSession}
        teamSpaceMembers={teamSpaceMembers}
        comments={comments}
      />
    </div>
  );
};

export default TicketInformationPage;
