import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/hooks/useAuth";
import LogOut from "@/pages/auth/LogOut";

const AuthInfo = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleNavigation = (value: string) => {
    navigate(value);
  };

  return (
    <>
      <Select onValueChange={handleNavigation}>
        <SelectTrigger className="w-[150px] data-[placeholder]:text-[var(--color-text)] font-medium">
          <SelectValue placeholder="My Account" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="/register">Register</SelectItem>
          <SelectItem value="/login">Login</SelectItem>
          {auth.user && (
            <SelectItem
              value={
                auth?.user?.role === "Admin"
                  ? "/admin/dashboard"
                  : "/users/dashboard"
              }
            >
              My Profile
            </SelectItem>
          )}

          {auth.user && <LogOut />}
        </SelectContent>
      </Select>
    </>
  );
};

export default AuthInfo;
