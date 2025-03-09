import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { TUserProfile } from "./user.types";
import { useAuth } from "@/hooks/useAuth";

const UserProfile = () => {
  const [user, setUser] = useState<TUserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = auth.accessToken;
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [api, auth.accessToken]);

  if (loading) return <p>Fetching Profile..</p>;
  return (
    <div>
      <h1>This is user profile</h1>
      {user?.name?.firstName}
    </div>
  );
};

export default UserProfile;
