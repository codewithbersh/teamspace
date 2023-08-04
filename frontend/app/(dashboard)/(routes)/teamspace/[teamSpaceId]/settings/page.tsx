import { redirect } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { TeamSpaceSettings } from "@/components/dashboard/settings/team-space-settings";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getTeamSpace } from "@/lib/axios/teamspace";
import { getCurrentSession } from "@/lib/session";

type Props = {
  params: {
    teamSpaceId: string;
  };
};

const SettingsPage = async ({ params: { teamSpaceId } }: Props) => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  const teamSpace = await getTeamSpace({
    access: session.user.backendSession.access,
    teamSpaceId: teamSpaceId,
  });
  if (!teamSpace) redirect("/teamspace");
  const isSuperUser =
    session.user.backendSession.user.pk === teamSpace.created_by;
  return (
    <div className="container space-y-12">
      <PageHeader
        title="Settings"
        description="View tickets, activities, and team space settings"
      />

      <Tabs defaultValue="tickets" className="space-y-8">
        <TabsList>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          {isSuperUser && (
            <TabsTrigger value="teamspace">Team Space</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="tickets">Tickets</TabsContent>
        <TabsContent value="activities">Activities</TabsContent>
        <TabsContent value="teamspace">
          <TeamSpaceSettings
            teamSpace={teamSpace}
            access={session.user.backendSession.access}
          />
        </TabsContent>
      </Tabs>

      <Separator />
    </div>
  );
};

export default SettingsPage;
