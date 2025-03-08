import { api } from "@/api";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
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
          originalRequest._retry = true;

          try {
            // refresh token is being sent to the backend from the cookies.
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              {},
              { withCredentials: true }
            );

            const { accessToken } = response.data.data;

            setAuth({ ...auth, accessToken: accessToken });

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
  }, [auth.accessToken, auth, setAuth]);
  return { api };
};

export default useAxios;
