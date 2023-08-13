import Link from "next/link";
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/tickets/table/data-table";
import { columns } from "@/components/dashboard/tickets/table/columns";

import { cn } from "@/lib/utils";
import { getTeamSpaceTickets } from "@/lib/axios/ticket";
import { getCurrentSession } from "@/lib/session";
import { Plus } from "lucide-react";
import { getMember } from "@/lib/axios/member";

type Props = {
  params: {
    teamSpaceId: string;
  };
};

const TicketsPage = async ({ params: { teamSpaceId } }: Props) => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  const access = session.user.backendSession.access;
  const tickets = await getTeamSpaceTickets({ access, teamSpaceId }).then(
    (ticket) => ticket?.filter((tx) => !tx.archived)
  );
  const member = await getMember({
    access,
    teamSpaceId,
    userId: session.user.backendSession.user.id,
  });

  if (!member) redirect("/login");

  return (
    <div className="container space-y-12">
      <PageHeader
        title="Tickets"
        description="Manage and view tickets for this team space."
      >
        {member.role !== "NA" && (
          <Link
            href={`/teamspace/${teamSpaceId}/tickets/form`}
            className={cn(buttonVariants(), "min-w-[125.47px] gap-2")}
          >
            <Plus className="w-[14px] h-[14px]" />
            New ticket
          </Link>
        )}
      </PageHeader>

      <DataTable columns={columns} data={tickets ?? []} />
    </div>
  );
};

export default TicketsPage;
