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
import { CommentForm } from "./comment-form";
import { Comment } from "./comment";

import { GetMembersType } from "@/lib/axios/member";
import {
  BackendSession,
  Comment as CommentType,
  TicketDetailed,
} from "@/types";

type Props = {
  ticket: TicketDetailed;
  backendSession: BackendSession;
  teamSpaceMembers: GetMembersType[];
  comments: CommentType[] | null;
};

const TicketInformationTable = ({
  ticket,
  backendSession,
  teamSpaceMembers,
  comments,
}: Props) => {
  const member = teamSpaceMembers.find(
    (member) => member.user.id === backendSession.user.pk
  )!;
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
          <TableCell className="font-medium align-top translate-y-[10px]">
            Issue
          </TableCell>
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
          <TableCell className="font-medium align-top translate-y-[10px]">
            Description
          </TableCell>
          <TableCell>{ticket.description}</TableCell>
          <TableCell className="text-right align-top translate-y-[10px]"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium align-top translate-y-[10px]">
            Assignee
          </TableCell>
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
          <TableCell className="text-right align-top translate-y-[10px]"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium align-top translate-y-[10px]">
            Discussion
          </TableCell>
          <TableCell>
            <div className="space-y-4">
              {!comments ? (
                "An error has occured fetching comments."
              ) : comments.length < 1 ? (
                "No comments"
              ) : (
                <>
                  {comments.map((comment) => (
                    <Comment
                      comment={comment}
                      member={member}
                      access={backendSession.access}
                      key={comment.id}
                    />
                  ))}
                </>
              )}
            </div>
          </TableCell>
          <TableCell className="text-right align-top translate-y-[10px]">
            <CommentForm
              access={backendSession.access}
              member={member}
              ticketId={ticket.id}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { TicketInformationTable };
