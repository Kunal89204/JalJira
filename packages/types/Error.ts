import { AxiosError } from "axios";

export interface APIErrorData {
  message: string;
  error: string;
  statusCode: number;
}



export type APIError = AxiosError<APIErrorData>;
