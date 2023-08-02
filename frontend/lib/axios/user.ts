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
