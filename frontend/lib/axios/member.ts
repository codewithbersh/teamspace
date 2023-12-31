import { isAxiosError } from "axios";
import { axiosApi } from "./axios";

import { Member } from "@/types";

type JoinTeamSpaceError = {
  error: string;
};

type JoinTeamSpaceProps = {
  access: string;
  code: string;
  user: string;
};

export const joinTeamSpace = async ({
  access,
  code,
  user,
}: JoinTeamSpaceProps) => {
  try {
    const { data } = await axiosApi.post<Member>(
      "members/",
      {
        code: code,
        user: user,
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
      const res = error.response?.data as JoinTeamSpaceError;
      return res;
    }
    console.log("error: ", error);
    return null;
  }
};

type GetMemberProps = {
  access: string;
  userId: string;
  teamSpaceId: string;
};

export const getMember = async ({
  access,
  userId,
  teamSpaceId,
}: GetMemberProps) => {
  try {
    const { data } = await axiosApi.get<Member>("members/", {
      params: {
        user_id: userId,
        team_space_id: teamSpaceId,
      },
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return data;
  } catch (error) {
    console.log("Get member error: ", error);
    return null;
  }
};

type GetTeamSpaceMembersProps = {
  access: string;
  teamSpaceId: string;
};

export const getTeamSpaceMembers = async ({
  access,
  teamSpaceId,
}: GetTeamSpaceMembersProps) => {
  try {
    const { data } = await axiosApi.get<Member[]>("members/", {
      params: {
        team_space_id: teamSpaceId,
      },
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return data;
  } catch (error) {
    console.log("Get team space members error: ", error);
    return null;
  }
};

type UpdateMemberProps = {
  access: string;
  memberId: string;
  values: {
    is_verified?: boolean;
    role?: "NA" | "AD";
  };
};

export const updateMember = async ({
  access,
  memberId,
  values,
}: UpdateMemberProps) => {
  try {
    const { data } = await axiosApi.patch<Member>(
      `members/${memberId}/`,
      {
        ...values,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Update member error: ", error);
    return null;
  }
};

type DeleteMemberProps = {
  access: string;
  memberId: string;
};

export const deleteMember = async ({ access, memberId }: DeleteMemberProps) => {
  try {
    const { status } = await axiosApi.delete(`members/${memberId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return status;
  } catch (error) {
    console.log("Delete member error: ", error);
    return null;
  }
};
