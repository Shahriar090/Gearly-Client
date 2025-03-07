import { TAuthContext } from "@/types/authTypes";
import { createContext } from "react";

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export { AuthContext };
