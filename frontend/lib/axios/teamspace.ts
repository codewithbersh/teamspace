import { isAxiosError } from "axios";
import { axiosApi } from "./axios";

import { TeamSpace } from "@/types";

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
    console.log("Create teamspace error: ", error);
    return null;
  }
};

type GetTeamSpacesProps = {
  access: string;
};

export const getTeamSpaces = async ({ access }: GetTeamSpacesProps) => {
  try {
    const { data } = await axiosApi.get<TeamSpace[]>(`teamspace/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return data;
  } catch (error) {
    console.log("Get team spaces error: ", error);
    return null;
  }
};

type GetTeamSpaceProps = {
  access: string;
  teamSpaceId: string;
};

export const getTeamSpace = async ({
  access,
  teamSpaceId,
}: GetTeamSpaceProps) => {
  try {
    const { data } = await axiosApi.get<TeamSpace>(
      `teamspace/${teamSpaceId}/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("Get team space error: ", error);
    return null;
  }
};

type UpdateTeamSpaceProps = {
  access: string;
  teamSpaceId: string;
  name: string;
};

export const updateTeamSpace = async ({
  access,
  teamSpaceId,
  name,
}: UpdateTeamSpaceProps) => {
  try {
    const { data } = await axiosApi.patch<TeamSpace>(
      `teamspace/${teamSpaceId}/`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Update team space error: ", error);
    return null;
  }
};

type DeleteTeamSpaceProps = {
  access: string;
  teamSpaceId: string;
};

export const deleteTeamSpace = async ({
  access,
  teamSpaceId,
}: DeleteTeamSpaceProps) => {
  try {
    const { status } = await axiosApi.delete(`teamspace/${teamSpaceId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return status;
  } catch (error) {
    console.log("Delete team space error: ", error);
    return null;
  }
};
