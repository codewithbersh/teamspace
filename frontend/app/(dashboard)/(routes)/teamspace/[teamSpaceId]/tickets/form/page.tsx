import { redirect } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { TicketForm } from "@/components/dashboard/tickets/ticket-form";

import { getTeamSpaceMembers } from "@/lib/axios/member";
import { getTeamSpace } from "@/lib/axios/teamspace";
import { getTicket } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";

type Props = {
  params: {
    teamSpaceId: string;
  };
  searchParams: {
    ticketId: string | undefined;
  };
};

const TicketFormPage = async ({
  params: { teamSpaceId },
  searchParams: { ticketId },
}: Props) => {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const teamSpace = await getTeamSpace({
    access: session.user.backendSession.access,
    teamSpaceId,
  });

  if (!teamSpace) redirect("/teamspace");

  const teamSpaceMembers = await getTeamSpaceMembers({
    access: session.user.backendSession.access,
    teamSpaceId,
  });

  if (!teamSpaceMembers) redirect(`/teamspace/${teamSpaceId}`);

  const role = teamSpaceMembers.find(
    (member) => member.user.id === session.user.backendSession.user.pk
  )?.role;

  if (!role) redirect("/teamspace");

  if (role === "NA") return <div>Not authorized</div>;

  const ticket = await getTicket({
    access: session.user.backendSession.access,
    ticketId,
  });

  if (ticket && "detail" in ticket)
    redirect(`/teamspace/${teamSpaceId}/tickets/form`);

  const title = ticket ? "Edit ticket" : "Create ticket";
  const description = ticket
    ? "Edit an existing ticket"
    : "Create a new ticket";

  return (
    <div className="container space-y-12">
      <PageHeader title={title} description={description} />
      <TicketForm
        teamSpaceMembers={teamSpaceMembers}
        ticket={ticket}
        backendSession={session.user.backendSession}
        teamSpaceId={teamSpace.id}
      />
    </div>
  );
};

export default TicketFormPage;
