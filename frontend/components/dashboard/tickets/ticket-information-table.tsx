import { Fragment } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CommentForm } from "./comment-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TicketIssueAction } from "./ticket-issue-action";
import { Comment } from "./comment";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AssigneeAction } from "./assignee-action";

import { Member, Ticket } from "@/types";
import { Terminal } from "lucide-react";
import { getTeamSpaceMembers } from "@/lib/axios/member";

type Props = {
  ticket: Ticket;
  member: Member;
  access: string;
  teamSpaceId: string;
};

const TicketInformationTable = async ({
  access,
  ticket,
  member,
  teamSpaceId,
}: Props) => {
  if (ticket.archived && member.role === "NA") return null;

  const nonAdminDisabledInformation =
    ticket.status === "CO" && member.role === "NA";

  const comments = ticket.comments;

  const members = await getTeamSpaceMembers({ access, teamSpaceId });

  if (!members) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Title</TableHead>
          <TableHead className="min-w-[400px]">Information</TableHead>
          <TableHead className="text-right min-w-[220px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium ">Issue</TableCell>
          <TableCell>{ticket.title}</TableCell>
          <TableCell className="text-right">
            <TicketIssueAction
              ticket={ticket}
              access={access}
              member={member}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium ">Description</TableCell>
          <TableCell>
            {ticket.description ?? (
              <span className="text-muted-foreground">
                No description added.
              </span>
            )}
          </TableCell>
          <TableCell className="text-right "></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium ">Assignee</TableCell>
          <TableCell>
            {ticket.assigned_members?.length ? (
              <div className="space-y-4">
                {ticket.assigned_members.map((assignee) => (
                  <div key={assignee.id} className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarImage src={assignee.user_detail.image_url} />
                      <AvatarFallback className="text-base font-bold">
                        {assignee.user_detail.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1 className="text-sm leading-none">
                        {assignee.user_detail.first_name}{" "}
                        {assignee.user_detail.last_name}
                      </h1>
                      <h1 className="text-muted-foreground text-sm leading-none">
                        {assignee.user_detail.email}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">No assignee.</span>
            )}
          </TableCell>
          <TableCell className="text-right ">
            {member.role !== "NA" && (
              <AssigneeAction
                assignees={ticket.assigned_members}
                members={members}
                ticketId={ticket.id}
                access={access}
              />
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium ">Discussion</TableCell>
          <TableCell>
            <div className="space-y-4">
              {!comments ? (
                "An error has occured fetching comments."
              ) : comments.length < 1 ? (
                <span className="text-muted-foreground">No comments.</span>
              ) : (
                <>
                  {nonAdminDisabledInformation && (
                    <div className="flex gap-4">
                      <div className="invisible w-10 h-10 shrink-0" />
                      <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                          Ticket has been resolved. Comments has been disabled.
                        </AlertDescription>
                      </Alert>
                      <div className="invisible w-10 h-10 shrink-0" />
                    </div>
                  )}
                  {comments.map((comment) => (
                    <Fragment key={comment.id}>
                      <Comment
                        comment={comment}
                        member={member}
                        access={access}
                        ticketStatus={ticket.status}
                      />
                    </Fragment>
                  ))}
                </>
              )}
            </div>
          </TableCell>
          <TableCell className="text-right ">
            <CommentForm
              access={access}
              member={member}
              ticketId={ticket.id}
              ticketStatus={ticket.status}
              assignedMembers={ticket.assigned_members}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { TicketInformationTable };
