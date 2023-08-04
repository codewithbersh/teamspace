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
    if (isAxiosError(error)) {
      console.log("error message createTeamSpace: ", error.message);
      return null;
    } else {
      console.log("unexpected error createTeamSpace: ", error);
      return null;
    }
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
    if (isAxiosError(error)) {
      console.log("error message getTeamSpaces: ", error.message);
      return null;
    } else {
      console.log("unexpected error getTeamSpaces: ", error);
      return null;
    }
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
    if (isAxiosError(error)) {
      console.log("error message getTeamSpace: ", error.message);
      return null;
    } else {
      console.log("unexpected error getTeamSpace: ", error);
      return null;
    }
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
    if (isAxiosError(error)) {
      console.log("error message updateTeamSpace: ", error.message);
      return null;
    } else {
      console.log("unexpected error updateTeamSpace: ", error);
      return null;
    }
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
    if (isAxiosError(error)) {
      console.log("error message updateTeamSpace: ", error.message);
      return null;
    } else {
      console.log("unexpected error updateTeamSpace: ", error);
      return null;
    }
  }
};
