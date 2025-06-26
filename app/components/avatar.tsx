import { useEffect } from "react";
import { useUser } from "./auth-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function CustomAvatar() {
  const { user } = useUser();
  let initials = user?.email?.slice(0, 2);

  useEffect(() => {
    initials = user?.email?.slice(0, 2);
  }, [user]);

  return user?.user_metadata.avatar_url ? (
    <Avatar className="flex justify-center items-center">
      <AvatarImage
        src={user?.user_metadata.avatar_url}
        alt={initials}
        className="bg-black m-0"
      ></AvatarImage>
    </Avatar>
  ) : (
    <p className="size-8 rounded-full bg-black text-white flex items-center justify-center">
      {initials}
    </p>
  );
}
