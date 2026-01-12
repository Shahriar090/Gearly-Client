import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router";

const LogOut = () => {
  const { setAuthData } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setAuthData({ user: null, accessToken: null, refreshToken: null });
    clearCart();
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
