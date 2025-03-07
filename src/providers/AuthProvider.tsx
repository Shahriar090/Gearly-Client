import { AuthContext } from "@/contexts";
import { TAuthContext, TAuthData } from "@/types/authTypes";
import { ReactNode, useState } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<TAuthData>({
    user: null,
    accessToken: null,
    refreshToken: null,
  });

  const value: TAuthContext = { auth, setAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
