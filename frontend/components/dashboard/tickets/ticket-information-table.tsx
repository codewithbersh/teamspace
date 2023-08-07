import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TicketIssueAction } from "./ticket-issue-action";

import { GetMembersType } from "@/lib/axios/member";
import { BackendSession, Member, TicketDetailed } from "@/types";

type Props = {
  ticket: TicketDetailed;
  backendSession: BackendSession;
  teamSpaceMembers: GetMembersType[];
};

const TicketInformationTable = ({
  ticket,
  backendSession,
  teamSpaceMembers,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Title</TableHead>
          <TableHead>Information</TableHead>
          <TableHead className="text-right min-w-[200px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Issue</TableCell>
          <TableCell>{ticket.title}</TableCell>
          <TableCell className="text-right">
            <TicketIssueAction
              ticket={ticket}
              backendSession={backendSession}
              teamSpaceMembers={teamSpaceMembers}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Description</TableCell>
          <TableCell>{ticket.description}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Assignee</TableCell>
          <TableCell>
            {ticket.assignee?.length ? (
              <div className="space-y-4">
                {ticket.assignee.map((person) => (
                  <div key={person.id} className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarImage src={person.image_url} />
                      <AvatarFallback className="text-base font-bold">
                        {person.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1 className="text-sm leading-none">
                        {person.first_name} {person.last_name}
                      </h1>
                      <h1 className="text-muted-foreground text-sm leading-none">
                        {person.email}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              "No assignee."
            )}
          </TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { TicketInformationTable };
