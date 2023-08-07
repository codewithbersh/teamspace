"use client";

import { useRouter } from "next/navigation";
import { ticketSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import Select from "react-select";

import { PRIORITY_CHOICES, TYPE_CHOICES } from "./config";
import { cn, formatDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { GetMembersType } from "@/lib/axios/member";
import { BackendSession, Ticket } from "@/types";
import { createTicket, updateTicket } from "@/lib/axios/ticket";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

type FormType = z.infer<typeof ticketSchema>;

type Props = {
  teamSpaceMembers: GetMembersType[];
  ticket: Ticket | null;
  backendSession: BackendSession;
  teamSpaceId: string;
};

const TicketForm = ({
  teamSpaceMembers,
  ticket,
  backendSession,
  teamSpaceId,
}: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const assigneeOptions = teamSpaceMembers.map((member) => ({
    value: member.user.id,
    label: member.user.email,
  }));

  const assigneeDefaultValues = ticket?.assignee.map((assignee) =>
    assigneeOptions.find((option) => option.value === assignee)
  );

  const { mutate: submitNewTicket } = useMutation({
    mutationFn: createTicket,
  });

  const { mutate: updateTicketInfo } = useMutation({
    mutationFn: updateTicket,
  });

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

  const assigneeNoChanges = assigneeDefaultValues
    ? assigneeDefaultValues.map((item) => (item ? item.value : item))
    : [];

  function onSubmit(values: FormType) {
    const newTicket = {
      ...values,
      created_by: backendSession.user.pk,
      team_space: teamSpaceId,
      assignee: !form.formState.dirtyFields.assignee
        ? assigneeNoChanges
        : values.assignee,
    };
    if (!ticket) {
      submitNewTicket(
        {
          access: backendSession.access,
          ticket: {
            assignee: newTicket.assignee as any,
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
          access: backendSession.access,
          ticket: {
            assignee: newTicket.assignee as any,
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
          ticketId: ticket.id,
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
  const buttonText = ticket ? "Save changes" : "Submit ticket";

  return (
    <div>
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
                  <Input placeholder="Add ticket title" {...field} />
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

          <Controller
            control={form.control}
            name="assignee"
            render={({ field: { onChange, value, ref } }) => (
              <div className="space-y-[6px] col-span-full">
                <FormLabel>Assignee</FormLabel>

                <Select
                  onChange={(val) => onChange(val.map((c) => c?.value))}
                  options={assigneeOptions}
                  isMulti
                  defaultValue={assigneeDefaultValues}
                  placeholder="Select assignee"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#E2E8F0",
                      borderRadius: "6px",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#E2E8F0",
                      },
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#0f172a",
                      fontSize: "14px", // change this color to the one you want
                    }),
                    multiValue: (base) => ({
                      ...base,
                      background: "#f8fafc",
                      borderRadius: "4px",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      fontSize: "14px", // change this size to the one you want
                      background: "#f8fafc",
                      color: "#0f172a",
                      borderRadius: "4px",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      background: "#f8fafc",
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                        color: "#0f172a",
                      },
                    }),
                    option: (base, state) => ({
                      ...base,
                      padding: "6px",
                      paddingLeft: "32px",
                      fontSize: "14px",
                      color: "#18181B",
                      borderRadius: "4px",
                      backgroundColor: state.isFocused ? "#f1f5f9" : "", // change this color to the one you want
                      "&:active": {
                        backgroundColor: "#f1f5f9",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      padding: "4px",
                      gap: "16px",
                    }),
                  }}
                />
                <FormDescription>
                  You can add/remove assignee later
                </FormDescription>
              </div>
            )}
          />

          <Button type="submit" className="w-fit col-span-full">
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { TicketForm };
