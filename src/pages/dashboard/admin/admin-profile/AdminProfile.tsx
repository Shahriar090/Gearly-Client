import { AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAxios from "@/hooks/useAxios";
import { Avatar } from "@radix-ui/react-avatar";
import {
  BriefcaseBusiness,
  Camera,
  Clock,
  Ellipsis,
  GraduationCap,
  Loader2,
  MailOpen,
  MapPin,
  MessageSquareMore,
  NotebookText,
  Plus,
  ShieldCheck,
  Trophy,
  UserCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TUser = {
  _id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: string;
  age: number;
  contactInfo: string;
  address: string;
  email: string;
  role: string;
  status: string;
  meta: {
    profileImage?: string;
    imageLastUpdated: string;
  };
};
const AdminProfile = () => {
  const [userData, setUserData] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { api } = useAxios();

  const inputFileRef = useRef<HTMLInputElement>(null); //ref for file input

  // handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    // creating form data
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/users/profile-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              console.log(progress);
            }
          },
        }
      );

      console.log(response);
      const updatedProfileImage = response.data?.data?.profileImage;

      setUserData((prevUserData) => {
        if (prevUserData) {
          return {
            ...prevUserData,
            meta: {
              ...prevUserData.meta,
              profileImage: updatedProfileImage,
              imageLastUpdated: new Date().toISOString(),
            },
          };
        }
        return prevUserData;
      });
      toast.success("Image Updated Successfully", {
        position: "top-right",
        duration: 3000,
      });
    } catch (error) {
      setError("Image uploading failed. Please try again.");
      console.error("Image Uploading Failed.!", error);
      toast.error("Image Uploading Failed", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setUploadingImage(false);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_LOCAL_URL}/users/profile`
        );
        setUserData(response.data?.data);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError("Error fetching user data. Please try again later.");
        console.error("Error Fetching User Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [api]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-4 text-center">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!userData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-4 text-center">
          <p>No user data available</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="main-container flex flex-col md:flex-row gap-2">
      <div className="left-section flex-[3] border bg-white shadow-lg">
        <div className="cover-bg relative bg-black w-full h-44">
          <h1
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
    text-5xl font-extrabold uppercase tracking-wider
    bg-gradient-to-r from-green-400 via-green-100 to-green-600 bg-clip-text text-transparent
    drop-shadow-lg "
          >
            Gearly
          </h1>
          <div className="profile-image">
            <Avatar className="absolute -bottom-[30%] left-5">
              <AvatarImage
                src={userData.meta?.profileImage}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
              />
            </Avatar>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputFileRef}
              onChange={handleFileChange}
            />
            <div className="image-uploader absolute -bottom-10 left-22">
              <button
                onClick={() => inputFileRef.current?.click()}
                disabled={uploadingImage}
              >
                <Camera
                  className={`bg-black opacity-60 text-white p-2 rounded-full w-8 h-8 ${
                    uploadingImage
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:opacity-70"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="infos mt-12 flex flex-col gap-4 md:flex-row md:justify-between p-8">
          <div>
            <h2 className="font-medium text-lg text-black">
              {" "}
              {userData.name.firstName} {userData.name.middleName}{" "}
              {userData.name.lastName}
            </h2>
            <h3 className="text-gray-700 font-medium">{userData.role}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <MessageSquareMore /> Message
            </Button>
            <Button variant="outline">
              <Plus /> Follow
            </Button>
            <Button variant="outline">
              <Ellipsis />
            </Button>
          </div>
        </div>
        <div className="achievements flex flex-wrap md:flex-nowrap items-center gap-4 mt-4 p-8">
          {/* job experience */}
          <div className="job-exp border-r pr-0.5 w-28 flex items-center gap-2">
            <Clock className="h-8 w-8" />
            <div>
              <h2 className="text-black text-sm font-medium"> 3+ Years Job</h2>
              <span className="text-gray-700 text-sm ">Experience</span>
            </div>
          </div>
          {/* certificates */}
          <div className="certificates border-r pr-0.5 w-28 flex items-center gap-2">
            <Trophy className="h-8 w-8" />
            <div>
              <h2 className="text-black text-sm font-medium">5 Certificates</h2>
              <span className="text-gray-700 text-sm ">Achieved</span>
            </div>
          </div>
          {/* internship */}
          <div className="internship w-28 flex items-center gap-2">
            <NotebookText className="h-8 w-8" />
            <div>
              <h2 className="text-black text-sm font-medium">2 Internship</h2>
              <span className="text-gray-700 text-sm ">Completed</span>
            </div>
          </div>
        </div>
      </div>
      <div className="right-section flex-1 bg-white shadow-lg">
        <h1 className="font-medium text-lg p-4">Personal Information</h1>
        <div className="w-full h-0.5 bg-gray-100"></div>

        <div className="infos space-y-5 p-4">
          <div className="position flex items-center gap-2">
            <BriefcaseBusiness className="bg-gray-100 p-2 rounded-full w-9 h-9" />
            <p>Project Head Manager</p>
          </div>
          <div className="education flex items-center gap-2">
            <GraduationCap className="bg-gray-100 p-2 rounded-full w-9 h-9" />
            <p>
              Went To{" "}
              <span className="font-semibold">Oxford International</span>
            </p>
          </div>
          <div className="location flex items-center gap-2">
            <MapPin className="bg-gray-100 p-2 rounded-full w-9 h-9" />
            <p>
              Lives In <span className="font-semibold">{userData.address}</span>
            </p>
          </div>
          <div className="followed flex items-center gap-2">
            <UserCheck className="bg-gray-100 p-2 rounded-full w-9 h-9" />
            <p>
              Followed By <span className="font-semibold">16.6k People</span>
            </p>
          </div>
          <div className="mail flex items-center gap-2">
            <MailOpen className="bg-gray-100 p-2 rounded-full w-9 h-9" />
            <p>
              Email <span className="font-semibold">{userData.email}</span>
            </p>
          </div>
          <div className="status flex items-center gap-2">
            <ShieldCheck className="bg-gray-100 p-2 rounded-full w-9 h-9" />
            <p>
              Status{" "}
              {userData.status === "Active" ? (
                <Badge className="bg-green-500" variant="default">
                  Active
                </Badge>
              ) : (
                <Badge variant="default" className="bg-red-500">
                  Blocked
                </Badge>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
