import { notFound, redirect } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { TeamSpaceSettings } from "@/components/dashboard/settings/team-space-settings";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersSettings } from "@/components/dashboard/settings/members-settings";

import { getTeamSpace } from "@/lib/axios/teamspace";
import { getCurrentSession } from "@/lib/session";
import { getTeamSpaceMembers } from "@/lib/axios/member";

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

  const members = await getTeamSpaceMembers({
    access: session.user.backendSession.access,
    teamSpaceId: teamSpaceId,
  });

  if (!members) redirect("/teamspace");

  const member = members.find(
    (member) => member.user.id === session.user.backendSession.user.pk
  )!;

  if (member.role === "NA") notFound();

  return (
    <div className="container space-y-12">
      <PageHeader
        title="Settings"
        description="View and manage team space members and settings."
      />

      <Tabs defaultValue="members" className="space-y-8">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="teamspace">Team Space</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <MembersSettings teamSpaceId={teamSpaceId} />
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
