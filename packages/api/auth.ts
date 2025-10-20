import { axiosInstance } from "../utils/axios/axiosInstance";

export const AuthApi = {
  signin: async ({ email, password }: { email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/sign-in", { email, password });
    return response.data;
  },
};
