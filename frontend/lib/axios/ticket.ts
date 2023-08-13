import { axiosApi } from "./axios";

import { Ticket } from "@/types";

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
    console.log("Get ticket error: ", error);
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
    const { data } = await axiosApi.get<Ticket>(`tickets/${ticketId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return data;
  } catch (error) {
    console.log("Get ticket information error: ", error);
    return null;
  }
};

type CreateTicketProps = {
  access: string;
  ticket: Pick<
    Ticket,
    | "created_by"
    | "team_space"
    | "type"
    | "priority"
    | "title"
    | "description"
    | "starting_date"
    | "end_date"
  >;
};

export const createTicket = async ({ access, ticket }: CreateTicketProps) => {
  try {
    const { data } = await axiosApi.post<Ticket>(
      "tickets/",
      {
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
    console.log("Create ticket error: ", error);
    return null;
  }
};

type UpdateTicketProps = {
  ticket: Pick<
    Ticket,
    | "id"
    | "type"
    | "title"
    | "description"
    | "starting_date"
    | "end_date"
    | "priority"
  >;
  access: string;
};

export const updateTicket = async ({ ticket, access }: UpdateTicketProps) => {
  try {
    const { data } = await axiosApi.patch<Ticket>(
      `tickets/${ticket.id}/`,
      {
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
    console.log("Update ticket error: ", error);
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
    console.log("Update ticket status error: ", error);
    return null;
  }
};

type GetTeamSpaceTickets = {
  teamSpaceId: string;
  access: string;
};

export const getTeamSpaceTickets = async ({
  teamSpaceId,
  access,
}: GetTeamSpaceTickets) => {
  try {
    const { data } = await axiosApi.get<Ticket[]>("tickets/", {
      params: {
        team_space_id: teamSpaceId,
      },
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return data;
  } catch (error) {
    console.log("Get teamspace tickets error: ", error);
    return undefined;
  }
};

type ArchiveTicketProps = {
  access: string;
  ticketId: string;
  archived: boolean;
};

export const archiveTicket = async ({
  access,
  ticketId,
  archived,
}: ArchiveTicketProps) => {
  try {
    const { data } = await axiosApi.patch<Ticket>(
      `tickets/${ticketId}/`,
      {
        archived,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Archive ticket error: ", error);
    return null;
  }
};

type DeleteTicketProps = {
  access: string;
  ticketId: string;
};

export const deleteTicket = async ({ access, ticketId }: DeleteTicketProps) => {
  try {
    const { status } = await axiosApi.delete(`tickets/${ticketId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return status;
  } catch (error) {
    console.log("Delete ticket error: ", error);
    return null;
  }
};
