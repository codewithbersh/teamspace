import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { format, parseISO } from "date-fns";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import {
  translateTicketPriority,
  translateTicketStatus,
  translateTicketType,
} from "@/lib/utils";
import { Ticket } from "@/types";

type Props = {
  ticket: Ticket;
};

const deadline = (input: any) =>
  input ? format(parseISO(input), "MMM do, yyyy") : null;

const TicketInformationSummary = ({ ticket }: Props) => {
  const summary = [
    {
      header: "Priority",
      content: translateTicketPriority(ticket.priority),
      footer: "Ticket Severity",
      icon: AlertCircle,
    },
    {
      header: "Type",
      content: translateTicketType(ticket.type),
      footer: "Ticket Type",
      icon: HelpCircle,
    },
    {
      header: "Status",
      content: translateTicketStatus(ticket.status),
      footer: "Ticket status",
      icon: CheckCircle2,
    },
    {
      header: "Deadline",
      content: deadline(ticket.end_date) ?? "--",
      footer: "Ticket Deadline",
      icon: CalendarClock,
    },
  ];
  return (
    <div className="grid min-[580px]:grid-cols-2 min-[1112px]:grid-cols-4 gap-4">
      {summary.map((item) => (
        <Card key={item.header} className="min-w-[250px] w-full">
          <CardHeader className="space-y-2.5">
            <CardDescription className="text-foreground flex items-center justify-between">
              <span>{item.header}</span>
              <item.icon className="w-[14px] h-[14px]" />
            </CardDescription>
            <CardTitle>{item.content}</CardTitle>
            <CardDescription>{item.footer}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export { TicketInformationSummary };
