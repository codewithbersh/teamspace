import { isAxiosError } from "axios";
import { axiosApi } from "./axios";
import { BackendSession } from "@/types";

type GetBackendSessionProps = {
  token: string;
};

export const getBackendSession = async ({ token }: GetBackendSessionProps) => {
  try {
    const { data } = await axiosApi.post<BackendSession>("auth/google/", {
      access_token: token,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message getAccessToken: ", error.message);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
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
    if (isAxiosError(error)) {
      console.log("error message getAccessToken: ", error.message);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
  }
};

type UpdateUserInfoProps = {
  token: string;
  user: {
    pk: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
};

export const updateUserInfo = async ({
  token,
  user: { image_url, pk },
}: UpdateUserInfoProps) => {
  try {
    const { data } = await axiosApi.patch<BackendSession["user"]>(
      `users/${pk}/`,
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
    if (isAxiosError(error)) {
      console.log("error message getAccessToken: ", error);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
  }
};
