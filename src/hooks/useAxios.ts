import { api } from "@/api";
import { RefreshResponseBody } from "@/types/authTypes";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

let isRefreshing = false;
let activeRefreshRequest: Promise<AxiosResponse<RefreshResponseBody>> | null =
  null;

const useAxios = () => {
  const { auth, setAuthData } = useAuth();

  useEffect(() => {
    // add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && auth.accessToken) {
          config.headers.Authorization = auth.accessToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    // add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          console.log("Your token has expired");
          originalRequest._retry = true;

          // IF A REFRESH TOKEN PROCESS ALREADY IN PROGRESS, WAIT FOR THAT PROMISE INSTEAD OF STARTING A NEW ONE.
          if (!isRefreshing) {
            isRefreshing = true;

            activeRefreshRequest = axios
              .post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
                {},
                { withCredentials: true }
              )
              .finally(() => {
                isRefreshing = false;
                activeRefreshRequest = null;
              });
          }
          try {
            // refresh token is being sent to the backend from the cookies.
            // const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,{},{withCredentials:true});
            const response = await activeRefreshRequest;
            console.log("trying to get new access token");
            const newAccessToken = response?.data?.data?.accessToken;
            console.log("Access Token Refreshed Successfully");

            if (!newAccessToken) {
              throw new Error("Refresh token response missing access token");
            }
            // setAuthData({ ...auth, accessToken: newAccessToken as string });
            setAuthData((prev) => ({ ...prev, accessToken: newAccessToken }));

            originalRequest.headers.Authorization = newAccessToken;

            return api(originalRequest);
          } catch (error) {
            setAuthData({ user: null, accessToken: null, refreshToken: null });
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
    // cleanup
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.accessToken, setAuthData]);
  return { api };
};

export default useAxios;
