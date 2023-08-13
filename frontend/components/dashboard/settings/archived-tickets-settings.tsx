import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/dashboard/tickets/table/data-table";
import { columns } from "@/components/dashboard/tickets/table/columns";

import { getTeamSpaceTickets } from "@/lib/axios/ticket";

type Props = {
  teamSpaceId: string;
};

const ArchivedTicketsSettings = async ({ teamSpaceId }: Props) => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  const access = session.user.backendSession.access;
  const tickets = await getTeamSpaceTickets({ access, teamSpaceId }).then(
    (ticket) => ticket?.filter((tx) => tx.archived)
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-bold  sm:text-2xl !leading-none">
          Archived Tickets
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage archvied tickets
        </p>
      </div>

      <DataTable columns={columns} data={tickets ?? []} />
    </div>
  );
};

export { ArchivedTicketsSettings };
