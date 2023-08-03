import { redirect } from "next/navigation";

import { TeamSwitcher } from "./team-switcher";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";

import { getTeamSpaces } from "@/lib/axios/teamspace";
import { getCurrentSession } from "@/lib/session";

const Navbar = async () => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  const teamSpaces = await getTeamSpaces({
    access: session.user.backendSession.access,
  });
  if (!teamSpaces) redirect("/login");

  return (
    <div className="border-b">
      <div className="container h-16 flex items-center">
        <TeamSwitcher teamSpaces={teamSpaces} />
        <MainNav />
        <div className="ml-auto flex items-center">
          <UserAccountNav session={session} />
        </div>
      </div>
    </div>
  );
};

export { Navbar };
