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
  // setAuthData: (authData: TAuthData) => void;
  setAuthData: (value: TAuthData | ((prev: TAuthData) => TAuthData)) => void;
};


export type RefreshResponseBody = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
};