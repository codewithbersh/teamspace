export type BackendUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type BackendSession = {
  access: string;
  refresh: string;
  user: {
    pk: string;
    email: string;
    first_name: string;
    last_name: string;
  };
};

export type TeamSpace = {
  id: string;
  created_by: string;
  name: string;
  code: string;
  created_on: Date;
};

export type Member = {
  id: string;
  role: "NA" | "SU" | "AD";
  is_verified: boolean;
  team_space: string;
  user: string;
};

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type Ticket = {
  id: string;
  team_space: string;
  type: "FR" | "IS" | "IM";
  title: string;
  description: string | undefined;
  status: "PE" | "IP" | "CO" | "FR" | "RO";
  priority: "LW" | "MD" | "HI" | "IM";
  assignee: string[];
  created_by: string[];
  created_on: Date;
  starting_date: Date | null | undefined;
  end_date: Date | null | undefined;
  archived: boolean;
};

export type TicketDetailed = Omit<
  Ticket,
  "team_space" | "assignee" | "created_by"
> & {
  team_space: TeamSpace;
  assignee: User[];
  created_by: User;
};
