import { AuthContext } from "@/contexts";
import { TAuthContext } from "@/types/authTypes";
import { useContext, useDebugValue } from "react";

export const useAuth = (): TAuthContext => {
  const context = useContext(AuthContext);
  //   I am using this check to prevent typescript error (Property 'auth' does not exist on type 'TAuthContext | undefined')
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth } = context;
  useDebugValue(auth, (auth) =>
    auth?.user ? "User Logged in" : "User Logged Out"
  );
  return context;
};
