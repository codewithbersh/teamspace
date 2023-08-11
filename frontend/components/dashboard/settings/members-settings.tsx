import { getTeamSpaceMembers } from "@/lib/axios/member";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";

type Props = {
  teamSpaceId: string;
};

const MembersSettings = async ({ teamSpaceId }: Props) => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  const access = session.user.backendSession.access;
  const members = await getTeamSpaceMembers({ access, teamSpaceId });
  if (!members) throw new Error("An error has occured.");

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-bold  sm:text-2xl !leading-none">Members</h1>
        <p className="text-sm text-muted-foreground">
          Manage team space members
        </p>
      </div>

      <DataTable columns={columns} data={members} />
    </div>
  );
};

export { MembersSettings };
