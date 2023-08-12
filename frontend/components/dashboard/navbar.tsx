import { redirect } from "next/navigation";

import { TeamSwitcher } from "./team-switcher";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";

import { getTeamSpaces } from "@/lib/axios/teamspace";
import { getCurrentSession } from "@/lib/session";

type Navbar = {
  teamSpaceId: string;
};
const Navbar = async ({ teamSpaceId }: Navbar) => {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const user = session.user.backendSession;

  const teamSpaces = await getTeamSpaces({
    access: user.access,
  });

  if (!teamSpaces) redirect("/teamspace");

  const member = teamSpaces
    .find((teamspace) => teamspace.id === teamSpaceId)!
    .assigned_members.find((member) => member.user === user.user.id)!;

  return (
    <div className="border-b">
      <div className="container h-16 flex items-center">
        <TeamSwitcher teamSpaces={teamSpaces} />
        <MainNav member={member} />
        <div className="ml-auto flex items-center">
          <UserAccountNav member={member} />
        </div>
      </div>
    </div>
  );
};

export { Navbar };
