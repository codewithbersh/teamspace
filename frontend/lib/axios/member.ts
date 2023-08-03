import { isAxiosError } from "axios";
import { axiosApi } from "./axios";

import { Member } from "@/types";

type CreateMemberProps = {
  access: string;
  member: Omit<Member, "id" | "nickname">;
};

export const createMember = async ({ access, member }: CreateMemberProps) => {
  try {
    const { data } = await axiosApi.post<Member>(
      "members/",
      {
        user: member.user,
        team_space: member.team_space,
        role: member.role,
        is_verified: member.is_verified,
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
      console.log("error message createMember: ", error.message);
      return null;
    } else {
      console.log("unexpected error createMember: ", error);
      return null;
    }
  }
};
