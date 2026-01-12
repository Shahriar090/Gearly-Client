import { AuthContext } from "@/contexts";
import { TAuthContext, TAuthData } from "@/types/authTypes";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<TAuthData>(() => {
    try {
      const storedAuthData = localStorage.getItem("auth");

      if (!storedAuthData || storedAuthData === "undefined") {
        throw new Error("No Audh Data Found.!");
      }

      return JSON.parse(storedAuthData);
    } catch (error) {
      console.error("Retrieving Auth Data From Local Storage Failed!", error);
      return { user: null, accessToken: null, refreshToken: null };
    }
  });

  const setAuthData = useCallback(
    (value: TAuthData | ((prev: TAuthData) => TAuthData)) => {
      setAuth(value);
    },
    []
  );

  useEffect(() => {
    if (auth.accessToken) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const value: TAuthContext = useMemo(
    () => ({
      auth,
      setAuthData,
    }),
    [auth, setAuthData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
