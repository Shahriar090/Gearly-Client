import { AuthContext } from "@/contexts";
import { TAuthContext, TAuthData } from "@/types/authTypes";
import { ReactNode, useCallback, useMemo, useState } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // The callback function passed to useState is called "Lazy Initializer". It only runs once during the initial render and then never again.It avoids running unnecessary code on every render.
  const [auth, setAuth] = useState<TAuthData>(() => {
    const storedAuthData = localStorage.getItem("auth");
    return storedAuthData
      ? JSON.parse(storedAuthData)
      : { user: null, accessToken: null, refreshToken: null };
  });

  // const setAuthData = (authData: TAuthData) => {
  //   setAuth(authData);
  //   localStorage.setItem("auth", JSON.stringify(authData));
  // };

  // const value: TAuthContext = { auth, setAuthData };

  // NOTE: The setAuthData function was re-created on every render since it was just a regular function.
  // This caused an INFINITE LOOP in the `useAuthInitializer` hook because setAuthData was used as a dependency in useEffect.
  // To fix this, I use `useCallback` to memoize the function and `useMemo` to memoize the context value.

  // useCallback ensures that this function is not recreated on every render.
  const setAuthData = useCallback((authData: TAuthData) => {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }, []);

  // without useMemo every rerender creates a new object, which could cause unnecessary rerenders in components that consumes the context.
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
