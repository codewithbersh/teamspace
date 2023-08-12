import { isAxiosError } from "axios";
import { axiosApi } from "./axios";
import { GoogleSession, User } from "@/types";
import { BackendSession } from "@/types/next-auth";

type GetBackendSessionProps = {
  token: string;
};

export const getBackendSession = async ({ token }: GetBackendSessionProps) => {
  try {
    const { data } = await axiosApi.post<GoogleSession>("auth/google/", {
      access_token: token,
    });
    return data;
  } catch (error) {
    console.log("Get backend session error: ", error);
    return null;
  }
};

type GetUserDetailsProps = {
  token: string;
  userId: string;
};

export const getUserDetails = async ({
  token,
  userId,
}: GetUserDetailsProps) => {
  try {
    const { data } = await axiosApi.get<User>(`users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log("Get user details error: ", error);
    return null;
  }
};

type AddImageUrlToUserProps = {
  token: string;
  user: {
    id: string;
    image_url?: string;
  };
};

export const addImageUrltoUser = async ({
  token,
  user: { image_url, id },
}: AddImageUrlToUserProps) => {
  try {
    const { data } = await axiosApi.patch<User>(
      `users/${id}/`,
      {
        image_url: image_url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Add image url to user error: ", error);
    return null;
  }
};

type GetDemoBackendSessionProps = {
  email: string;
  password: string;
};

export const getDemoBackendSession = async ({
  email,
  password,
}: GetDemoBackendSessionProps) => {
  try {
    const { data } = await axiosApi.post<BackendSession>("auth/login/", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log("Get demo backend session error: ", error);
    return null;
  }
};
