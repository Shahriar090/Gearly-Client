import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useAuthInitializer = () => {
  const { setAuthData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const refreshAuthData = async () => {
      try {
        const storedData = localStorage.getItem("auth");
        if (!storedData) return;
        const parsedData = JSON.parse(storedData);
        const { user, refreshToken } = parsedData;

        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data.data;
        const newAuthData = { user, accessToken, refreshToken };
        if (isMounted) {
          setAuthData(newAuthData);
          localStorage.setItem("auth", JSON.stringify(newAuthData));
        }
      } catch (error) {
        console.error("Failed To Refresh Token", error);
        if (isMounted) {
          localStorage.removeItem("auth");
          setAuthData({ user: null, accessToken: null, refreshToken: null });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    refreshAuthData();
    return () => {
      isMounted = false;
    };
  }, [setAuthData]);
  return loading;
};
