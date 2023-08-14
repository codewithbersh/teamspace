import { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { TicketForm } from "@/components/dashboard/tickets/ticket-form";

import { getMember } from "@/lib/axios/member";
import { getTicket } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Team Space | Ticket Form",
  description: "Edit or Create Ticket",
};

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

  const access = session.user.backendSession.access;
  const user = session.user.backendSession.user;

  const member = await getMember({ access, teamSpaceId, userId: user.id });

  if (!member) redirect("/teamspace");

  const ticket = await getTicket({ access, ticketId });

  const title = ticket ? "Edit ticket" : "Create ticket";
  const description = ticket
    ? "Edit an existing ticket"
    : "Create a new ticket";

  return (
    <div className="container space-y-12">
      <PageHeader title={title} description={description} />
      {member.role === "NA" ? (
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
            ticket={ticket}
            access={access}
            teamSpaceId={teamSpaceId}
            member={member}
          />
        </>
      )}
    </div>
  );
};

export default TicketFormPage;
