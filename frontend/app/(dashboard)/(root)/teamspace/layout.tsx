import { redirect } from "next/navigation";

import { getTeamSpaces } from "@/lib/axios/teamspace";
import { getCurrentSession } from "@/lib/session";

type Props = {
  children: React.ReactNode;
};

const DashboardRootLayout = async ({ children }: Props) => {
  const session = await getCurrentSession();

  if (!session) redirect("/login");
  const teamspaces = await getTeamSpaces({
    access: session.user.backendSession.access,
  });

  if (teamspaces && teamspaces.length > 0)
    redirect(`/teamspace/${teamspaces[0].id}`);

  return <>{children}</>;
};

export default DashboardRootLayout;
