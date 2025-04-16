import { api } from "@/api";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuthData } = useAuth();
  useEffect(() => {
    // add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const accessToken = auth.accessToken;

        if (accessToken) {
          config.headers.Authorization = accessToken;
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

          try {
            // refresh token is being sent to the backend from the cookies.
            const response = await axios.post(
              `${import.meta.env.VITE_LOCAL_SERVER_URL}/auth/refresh-token`,
              {},
              { withCredentials: true }
            );
            console.log("trying to get new access token");

            const { accessToken } = response.data.data;
            console.log("Yeeeeeees, new access token paiya gechi mama");
            setAuthData({ ...auth, accessToken: accessToken });

            originalRequest.headers.Authorization = accessToken;

            return axios(originalRequest);
          } catch (error) {
            console.error(error);
            throw error;
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
  }, [auth.accessToken, auth, setAuthData]);
  return { api };
};

export default useAxios;
