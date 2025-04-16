import axios from "axios";

// This configuration is for renewing the access token with the refresh token each time the access token expires
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_LOCAL_SERVER_URL}`,
  withCredentials: true,
});
