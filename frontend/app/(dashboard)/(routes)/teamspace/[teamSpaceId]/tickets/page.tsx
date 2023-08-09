import Link from "next/link";

import { PageHeader } from "@/components/dashboard/page-header";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { getTeamSpaceTickets } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/dashboard/tickets/table/data-table";
import { columns } from "@/components/dashboard/tickets/table/columns";

type Props = {
  params: {
    teamSpaceId: string;
  };
};

const TicketsPage = async ({ params: { teamSpaceId } }: Props) => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  const access = session.user.backendSession.access;
  const tickets = await getTeamSpaceTickets({ access, teamSpaceId });
  return (
    <div className="container space-y-12">
      <PageHeader
        title="Tickets"
        description="Manage and view tickets for this team space."
      >
        <Link
          href={`/teamspace/${teamSpaceId}/tickets/form`}
          className={cn(buttonVariants(), "min-w-[103.47px]")}
        >
          New ticket
        </Link>
      </PageHeader>

      <DataTable columns={columns} data={tickets ?? []} />
    </div>
  );
};

export default TicketsPage;
