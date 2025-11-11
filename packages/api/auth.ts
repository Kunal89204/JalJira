import { axiosInstance } from "../utils/axios/axiosInstance";

export const AuthApi = {
  signin: async ({ email, password }: { email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/sign-in", {
      email,
      password,
    });
    return response.data;
  },

  signup: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await axiosInstance.post("/auth/sign-up", {
      name,
      email,
      password,
    });
    return response.data;
  },
};
