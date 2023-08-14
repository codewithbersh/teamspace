import { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { TeamSpaceSettings } from "@/components/dashboard/settings/team-space-settings";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersSettings } from "@/components/dashboard/settings/members-settings";
import { ArchivedTicketsSettings } from "@/components/dashboard/settings/archived-tickets-settings";

import { getTeamSpace } from "@/lib/axios/teamspace";
import { getCurrentSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Team Space | Settings",
  description: "Settings Page",
};

type Props = {
  params: {
    teamSpaceId: string;
  };
};

const SettingsPage = async ({ params: { teamSpaceId } }: Props) => {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const access = session.user.backendSession.access;

  const teamSpace = await getTeamSpace({
    access,
    teamSpaceId,
  });

  if (!teamSpace) redirect("/teamspace");

  const member = teamSpace.assigned_members.find(
    (member) => member.user === session.user.backendSession.user.id
  );

  if (!member || member.role === "NA")
    redirect(`/teamspace/${teamSpaceId}/tickets`);

  return (
    <div className="container space-y-12">
      <PageHeader
        title="Settings"
        description="View and manage team space members, archived tickets, and other settings."
      />

      <Tabs defaultValue="members" className="space-y-8">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="archived">Archived Tickets</TabsTrigger>
          <TabsTrigger value="teamspace">Team Space</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <MembersSettings teamSpace={teamSpace} member={member} />
        </TabsContent>
        <TabsContent value="archived">
          <ArchivedTicketsSettings teamSpaceId={teamSpaceId} />
        </TabsContent>
        <TabsContent value="teamspace">
          <TeamSpaceSettings
            teamSpace={teamSpace}
            session={session}
            member={member}
          />
        </TabsContent>
      </Tabs>

      <Separator />
    </div>
  );
};

export default SettingsPage;
