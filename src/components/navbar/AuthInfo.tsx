import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AuthInfo = () => {
  const navigate = useNavigate();

  const handleNavigation = (value: string) => {
    navigate(value);
  };

  return (
    <Select onValueChange={handleNavigation}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="My Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="/register">Register</SelectItem>
        <SelectItem value="/login">Login</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AuthInfo;
