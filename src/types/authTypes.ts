export type TUser = {
  id: string;
  email: string;
  role: string;
};

export type TAuthData = {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type TAuthContext = {
  auth: TAuthData;
  setAuth: (auth: TAuthData) => void;
};
