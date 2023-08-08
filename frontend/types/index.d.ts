export type BackendUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string | undefined;
};

export type BackendSession = {
  access: string;
  refresh: string;
  user: {
    pk: string;
    email: string;
    first_name: string;
    last_name: string;
    image_url: string | undefined;
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
  image_url: string | undefined;
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
  ticket_id: string;
};

export type TicketDetailed = Omit<
  Ticket,
  "team_space" | "assignee" | "created_by"
> & {
  team_space: TeamSpace;
  assignee: User[] | undefined;
  created_by: User;
};

export type Comment = {
  id: string;
  member_detail: Omit<Member, "user"> & {
    user: BackendUser;
  };
  member: string;
  ticket: string;
  description: string;
  created: Date;
  updated: Date;
  has_been_edited: boolean;
  has_been_deleted: boolean;
};

export type TicketHistory = {
  history_id: number;
  created_by: User;
  history_user: User;
  changed_fields: [
    "type",
    "title",
    "description",
    "status",
    "priority",
    "assignee",
    "starting_date",
    "end_date",
    "archived",
  ];
  id: string;
  ticket_id: string;
  type: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_on: string;
  starting_date: string;
  end_date: string;
  archived: boolean;
  history_date: string;
  history_change_reason: string | null;
  history_type: "+" | "~" | "-";
  team_space: TeamSpace;
};
