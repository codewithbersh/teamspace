import { axiosApi } from "./axios";
import { isAxiosError } from "axios";

import { Ticket, TicketDetailed } from "@/types";

type GetTicketProps = {
  access: string;
  ticketId: string | undefined;
};

export const getTicket = async ({ access, ticketId }: GetTicketProps) => {
  if (!ticketId) return null;

  try {
    const { data } = await axiosApi.get<Ticket>(`tickets/${ticketId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as { detail: string };
    }
    return null;
  }
};

type GetTicketInformationProps = {
  access: string;
  ticketId: string;
};

export const getTicketInformation = async ({
  access,
  ticketId,
}: GetTicketInformationProps) => {
  try {
    const { data } = await axiosApi.get<TicketDetailed>(
      `ticket-information/${ticketId}/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("Error: ", error);
      return null;
    }
    console.log("Error: ", error);
    return null;
  }
};

type NewTicket = {
  created_by: string;
  team_space: string;
  type: "FR" | "IS" | "IM";
  priority: "IM" | "LW" | "MD" | "HI";
  title: string;
  description?: string | undefined;
  starting_date?: string | null | undefined;
  end_date?: string | undefined | null;
  assignee?: string[] | undefined;
};

type CreateTicketProps = {
  access: string;
  ticket: NewTicket;
};

export const createTicket = async ({ access, ticket }: CreateTicketProps) => {
  try {
    const { data } = await axiosApi.post<Ticket>(
      "tickets/",
      {
        assignee: ticket.assignee ?? [],
        team_space: ticket.team_space,
        created_by: ticket.created_by,
        title: ticket.title,
        description: ticket.description ?? null,
        starting_date: ticket.starting_date ?? null,
        end_date: ticket.end_date ?? null,
        priority: ticket.priority,
        type: ticket.type,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("Error message Create Ticket: ", error);
      return null;
    }
    console.log("Error: ", error);
    return null;
  }
};

type UpdateTicketProps = {
  ticketId: string;
  ticket: NewTicket;
  access: string;
};

export const updateTicket = async ({
  ticketId,
  ticket,
  access,
}: UpdateTicketProps) => {
  try {
    const { data } = await axiosApi.patch<Ticket>(
      `tickets/${ticketId}/`,
      {
        assignee: ticket.assignee ?? [],
        team_space: ticket.team_space,
        created_by: ticket.created_by,
        title: ticket.title,
        description: ticket.description ?? null,
        starting_date: ticket.starting_date ?? null,
        end_date: ticket.end_date ?? null,
        priority: ticket.priority,
        type: ticket.type,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("Error message Create Ticket: ", error);
      return null;
    }
    console.log("Error: ", error);
    return null;
  }
};

type UpdateTicketStatusProps = {
  access: string;
  ticketId: string;
  status: Ticket["status"];
};

export const updateTicketStatus = async ({
  access,
  ticketId,
  status,
}: UpdateTicketStatusProps) => {
  try {
    const { data } = await axiosApi.patch<Ticket>(
      `tickets/${ticketId}/`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("Error message updateTicketStatus: ", error);
      return null;
    }
    console.log("Error: ", error);
    return null;
  }
};
