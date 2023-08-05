import Link from "next/link";

import { PageHeader } from "@/components/dashboard/page-header";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type Props = {
  params: {
    teamSpaceId: string;
  };
};

const TicketsPage = ({ params: { teamSpaceId } }: Props) => {
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
    </div>
  );
};

export default TicketsPage;
