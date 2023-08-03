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
