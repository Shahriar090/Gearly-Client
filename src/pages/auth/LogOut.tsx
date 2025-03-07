import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const LogOut = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setAuth({ user: null, accessToken: null, refreshToken: null });
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
