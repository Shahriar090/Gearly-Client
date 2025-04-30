import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { TUserProfile } from "./user.types";

const UserProfile = () => {
  const [user, setUser] = useState<TUserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const { api } = useAxios();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/profile`
        );

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [api]);

  if (loading) return <p>Fetching Profile..</p>;
  return (
    <div>
      <h1>This is user profile</h1>
      {user?.name?.firstName}
    </div>
  );
};

export default UserProfile;
