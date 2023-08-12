import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { superUserColumns } from "./table/super-user-columns";

import { Member, TeamSpace } from "@/types";

type Props = {
  teamSpace: TeamSpace;
  member: Member;
};

const MembersSettings = ({ teamSpace, member }: Props) => {
  const members = teamSpace.assigned_members;

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-bold  sm:text-2xl !leading-none">Members</h1>
        <p className="text-sm text-muted-foreground">
          Manage team space members
        </p>
      </div>

      <DataTable
        columns={member.role !== "SU" ? columns : superUserColumns}
        data={members}
      />
    </div>
  );
};

export { MembersSettings };
