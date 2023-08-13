import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const Loading = () => {
  const summary = [
    {
      header: "Priority",
      footer: "Ticket Severity",
      icon: AlertCircle,
    },
    {
      header: "Type",
      footer: "Ticket Type",
      icon: HelpCircle,
    },
    {
      header: "Status",
      footer: "Ticket status",
      icon: CheckCircle2,
    },
    {
      header: "Deadline",
      footer: "Ticket Deadline",
      icon: CalendarClock,
    },
  ];
  return (
    <div className="container space-y-12">
      <div className="space-y-4 pt-4 sm:space-y-6 sm:pt-6 w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="space-y-1 w-full">
            <Skeleton className="h-[18px] sm:h-[30px] w-[200px]" />
            <Skeleton className="h-[20px] sm:h-[24px] w-full max-w-[500px]" />
          </div>
        </div>
        <Separator />
      </div>
      <div className="grid min-[580px]:grid-cols-2 min-[1112px]:grid-cols-4 gap-4">
        {summary.map((item) => (
          <Card key={item.header} className="min-w-[250px] w-full">
            <CardHeader className="space-y-2.5">
              <CardDescription className="text-foreground flex items-center justify-between">
                <span>{item.header}</span>
                <item.icon className="w-[14px] h-[14px]" />
              </CardDescription>
              <CardTitle>
                <Skeleton className="h-[24px] w-2/3" />
              </CardTitle>
              <CardDescription>{item.footer}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
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
            <TableCell>
              <Skeleton className="h-[18px] w-2/3" />
            </TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium ">Description</TableCell>
            <TableCell>
              <Skeleton className="h-[18px] w-2/3" />
            </TableCell>
            <TableCell className="text-right "></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium ">Assignee</TableCell>
            <TableCell>
              <div className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-full max-w-[200px]" />
              </div>
            </TableCell>
            <TableCell className="text-right "></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium ">Discussion</TableCell>
            <TableCell>
              <div className="flex gap-4 items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-[68px] w-full" />
              </div>
            </TableCell>
            <TableCell className="text-right "></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;
