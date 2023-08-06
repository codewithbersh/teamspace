import { redirect } from "next/navigation";
import Link from "next/link";

import { TicketInformationSummary } from "@/components/dashboard/tickets/ticket-information-summary";
import { PageHeader } from "@/components/dashboard/page-header";
import { buttonVariants } from "@/components/ui/button";

import { getTeamSpace } from "@/lib/axios/teamspace";
import { getTicketInformation } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";
import { cn } from "@/lib/utils";

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
  return (
    <div className="container space-y-12">
      <PageHeader
        title="Ticket Information"
        description="View and update ticket"
      >
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
      </PageHeader>

      <TicketInformationSummary ticket={ticket} />
    </div>
  );
};

export default TicketInformationPage;
