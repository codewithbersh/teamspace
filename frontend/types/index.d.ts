export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string | undefined;
};

export type GoogleSession = {
  access: string;
  user: {
    pk: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export type TeamSpace = {
  id: string;
  created_by_detail: User;
  assigned_members: Member[];

  name: string;
  code: string;
  created_on: string;
  created_by: string;
};

export type Member = {
  id: string;
  user_detail: User;

  role: "NA" | "SU" | "AD";
  is_verified: boolean;
  date_join: string;
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
  created_by_detail: Member;
  assigned_members: Member[];
  comments: Comment[];
  ticket_id: string;

  team_space: string;
  created_by: string;

  type: "FR" | "IS" | "IM";
  title: string;
  description: string | undefined;
  status: "PE" | "IP" | "CO" | "FR" | "RO";
  priority: "LW" | "MD" | "HI" | "IM";
  created_on: string;
  starting_date: string | null;
  end_date: string | null;
  archived: boolean;
};

export type Comment = {
  id: string;
  member_detail: Member;
  created: string;
  updated: string;
  has_been_edited: boolean;
  has_been_deleted: boolean;

  description: string;

  member: string;
  ticket: string;
};

export type Assignee = {
  id: string;
  date_assigned: string;
  ticket: string;
  member: string;
};
