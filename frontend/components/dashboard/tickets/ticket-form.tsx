"use client";

import { useRouter } from "next/navigation";
import { ticketSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select as Select2,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { PRIORITY_CHOICES, TYPE_CHOICES } from "./config";
import { cn, formatDate } from "@/lib/utils";
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import { Member, Ticket } from "@/types";
import { createTicket, updateTicket } from "@/lib/axios/ticket";
import { format } from "date-fns";
import { DEMO_TICKETS } from "@/lib/demo-tickets";

type FormType = z.infer<typeof ticketSchema>;

type Props = {
  ticket: Ticket | null;
  teamSpaceId: string;
  access: string;
  member: Member;
};

const TicketForm = ({ ticket, access, teamSpaceId, member }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: submitNewTicket, isLoading: isCreatingTicket } = useMutation({
    mutationFn: createTicket,
  });

  const { mutate: updateTicketInfo, isLoading: isUpdatingTicket } = useMutation(
    {
      mutationFn: updateTicket,
    }
  );

  const form = useForm<FormType>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: ticket?.title || "",
      description: ticket?.description ? ticket.description : undefined,
      end_date: ticket?.end_date
        ? new Date(ticket?.end_date as any)
        : undefined,
      priority: ticket?.priority,
      starting_date: ticket?.starting_date
        ? new Date(ticket?.starting_date as any)
        : undefined,
      type: ticket?.type,
    },
    mode: "onChange",
  });

  function onSubmit(values: FormType) {
    const newTicket = {
      ...values,
      created_by: member.id,
      team_space: teamSpaceId,
    };
    if (!ticket) {
      submitNewTicket(
        {
          access: access,
          ticket: {
            team_space: newTicket.team_space,
            created_by: newTicket.created_by,
            title: newTicket.title,
            description: newTicket.description,
            starting_date: newTicket.starting_date
              ? formatDate(newTicket.starting_date)
              : null,
            end_date: newTicket.end_date
              ? formatDate(newTicket.end_date)
              : null,
            priority: newTicket.priority,
            type: newTicket.type,
          },
        },
        {
          onSuccess: (values) => {
            if (!values) {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
            } else {
              toast({
                description: "Ticket has been created successfully.",
              });
              router.refresh();
              router.push(`/teamspace/${teamSpaceId}/tickets/${values.id}`);
            }
          },
        }
      );
    } else {
      updateTicketInfo(
        {
          access: access,
          ticket: {
            id: ticket.id,
            title: newTicket.title,
            description: newTicket.description,
            starting_date: newTicket.starting_date
              ? formatDate(newTicket.starting_date)
              : null,
            end_date: newTicket.end_date
              ? formatDate(newTicket.end_date)
              : null,
            priority: newTicket.priority,
            type: newTicket.type,
          },
        },
        {
          onSuccess: (values) => {
            if (!values) {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
            } else {
              toast({
                description: "Ticket has been updated successfully.",
              });
              router.refresh();
              router.push(`/teamspace/${teamSpaceId}/tickets/${values.id}`);
            }
          },
        }
      );
    }
  }

  const startingDateCurrentValue = form.watch("starting_date");
  const buttonText = ticket
    ? isUpdatingTicket
      ? "Saving Changes"
      : "Save Changes"
    : isCreatingTicket
    ? "Creating Ticket"
    : "Create Ticket";

  const isDemoTicket = ticket ? DEMO_TICKETS.includes(ticket.id) : false;

  return (
    <div>
      {isDemoTicket && (
        <Alert variant="destructive" className="max-w-[600px]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Please note that this is a demo ticket for demonstration purposes
            only. The title and description are not editable in this context.
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-8 grid-cols-2 max-w-[600px]"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>Type</FormLabel>
                <Select2
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TYPE_CHOICES.map((choice) => (
                      <SelectItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select2>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>Priority</FormLabel>
                <Select2
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PRIORITY_CHOICES.map((choice) => (
                      <SelectItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select2>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add ticket title"
                    {...field}
                    disabled={isDemoTicket}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us something about the ticket"
                    className="resize-none"
                    disabled={isDemoTicket}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="starting_date"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-2 sm:col-span-1">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? field.value : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-2 sm:col-span-1">
                <FormLabel>Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground")}
                        disabled={!startingDateCurrentValue}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? field.value : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < startingDateCurrentValue! ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-fit col-span-full gap-2"
            disabled={isCreatingTicket || isUpdatingTicket}
          >
            {(isUpdatingTicket || isCreatingTicket) && (
              <Loader2 className="w-[14px] h-[14px] animate-spin" />
            )}
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { TicketForm };
