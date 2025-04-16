import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const LogOut = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setAuthData({ user: null, accessToken: null, refreshToken: null });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <div>
      <Button
        onClick={handleLogOut}
        variant="destructive"
        className="cursor-pointer w-full"
        size="sm"
      >
        Logout
      </Button>
    </div>
  );
};

export default LogOut;
