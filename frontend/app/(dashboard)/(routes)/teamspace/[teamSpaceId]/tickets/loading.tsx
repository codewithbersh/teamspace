import { PageHeader } from "@/components/dashboard/page-header";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container space-y-12">
      <PageHeader
        title="Tickets"
        description="Manage and view tickets for this team space."
      ></PageHeader>

      <div className="space-y-4">
        <Skeleton className="w-full max-w-[350px] h-8" />
        <Skeleton className="w-full  h-28" />
      </div>
    </div>
  );
};

export default Loading;
