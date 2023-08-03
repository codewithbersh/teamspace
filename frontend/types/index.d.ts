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
  nickname: string | null;
  team_space: string;
  user: string;
};
