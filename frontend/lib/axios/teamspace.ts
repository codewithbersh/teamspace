import { isAxiosError } from "axios";
import { axiosApi } from "./axios";
import { BackendSession, TeamSpace } from "@/types";

type CreateTeamSpaceProps = {
  access: string | undefined;
  teamSpace: Pick<TeamSpace, "name" | "created_by"> | null;
};

export const createTeamSpace = async ({
  access,
  teamSpace,
}: CreateTeamSpaceProps) => {
  if (!access || !teamSpace) return null;
  try {
    const { data } = await axiosApi.post<TeamSpace>(
      "teamspace/",
      {
        name: teamSpace.name,
        created_by: teamSpace.created_by,
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
      console.log("error message createTeamSpace: ", error.message);
      return null;
    } else {
      console.log("unexpected error createTeamSpace: ", error);
      return null;
    }
  }
};
