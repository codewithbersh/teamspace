import axios from "axios";

export const axiosApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api/`,
});

export const initializeBackend = async () => {
  try {
    const { data } = await axiosApi.get<true>("init/");
    return data;
  } catch (error) {
    console.log("Initialize backend error: ", error);
    return null;
  }
};
