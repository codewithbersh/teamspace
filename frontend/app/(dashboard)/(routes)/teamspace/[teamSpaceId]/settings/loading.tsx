import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container space-y-12">
      <PageHeader
        title="Settings"
        description="View and manage team space members, archived tickets, and other settings."
      />

      <Tabs defaultValue="members" className="space-y-8">
        <TabsList>
          <TabsTrigger value="members" disabled>
            Members
          </TabsTrigger>
          <TabsTrigger value="archived" disabled>
            Archived Tickets
          </TabsTrigger>
          <TabsTrigger value="teamspace" disabled>
            Team Space
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <div className="space-y-8">
            <div className="space-y-1">
              <h1 className="font-bold  sm:text-2xl !leading-none">Members</h1>
              <p className="text-sm text-muted-foreground">
                Manage team space members
              </p>
            </div>

            <div className="space-y-4">
              <Skeleton className="w-full max-w-[384px] h-10" />
              <Skeleton className="w-full h-20" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />
    </div>
  );
};

export default Loading;
