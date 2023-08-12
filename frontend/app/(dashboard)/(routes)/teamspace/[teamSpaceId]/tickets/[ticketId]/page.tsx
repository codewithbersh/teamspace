import Link from "next/link";
import { redirect } from "next/navigation";

import { TicketInformationSummary } from "@/components/dashboard/tickets/ticket-information-summary";
import { PageHeader } from "@/components/dashboard/page-header";
import { buttonVariants } from "@/components/ui/button";
import { TicketInformationTable } from "@/components/dashboard/tickets/ticket-information-table";

import { getTicketInformation } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";
import { cn } from "@/lib/utils";
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

  if (!ticket || !member) redirect(`/teamspace/${teamSpaceId}`);

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
        member={member}
        access={access}
        teamSpaceId={teamSpaceId}
      />
    </div>
  );
};

export default TicketInformationPage;
