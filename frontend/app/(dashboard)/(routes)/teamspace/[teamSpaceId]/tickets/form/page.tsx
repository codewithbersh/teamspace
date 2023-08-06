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
      {role === "NA" ? (
        <>
          <div className="space-y-2">
            <h1 className=" font-medium text-lg leading-none">
              Permission Denied
            </h1>
            <p className="text-muted-foreground">
              Only admin can create or update a ticket. Contact your
              administrator.
            </p>
          </div>
        </>
      ) : (
        <>
          <TicketForm
            teamSpaceMembers={teamSpaceMembers}
            ticket={ticket}
            backendSession={session.user.backendSession}
            teamSpaceId={teamSpace.id}
          />
        </>
      )}
    </div>
  );
};

export default TicketFormPage;
