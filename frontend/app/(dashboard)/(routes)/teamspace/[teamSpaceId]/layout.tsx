import { redirect } from "next/navigation";

import { getTeamSpace } from "@/lib/axios/teamspace";
import { getCurrentSession } from "@/lib/session";

type Props = {
  children: React.ReactNode;
  params: {
    teamSpaceId: string;
  };
};

const DashboardLayout = async ({
  children,
  params: { teamSpaceId },
}: Props) => {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const teamspace = await getTeamSpace({
    access: session.user.backendSession.access,
    teamSpaceId: teamSpaceId,
  });

  if (!teamspace) redirect("/teamspace");

  return <section>{children}</section>;
};

export default DashboardLayout;
