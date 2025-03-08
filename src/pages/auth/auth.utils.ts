import { AxiosError } from "axios";

// function to extract error message
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || "An Error Occurred During Login";
  }
  return "Something Went Wrong, Please Try Again";
};
