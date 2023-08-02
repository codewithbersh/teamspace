import axios from "axios";

export const axiosApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api/`,
});
