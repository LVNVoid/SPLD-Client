import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toCapitalize } from "@/lib/utils";
import { Mail, RollerCoaster, User2, UserLock } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.userState);

  if (!user) {
    return <p className="text-center mt-8">Tidak ada data pengguna.</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Informasi pribadi</p>
      </div>
      <div className="flex space-x-8 my-10">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {toCapitalize(user.name).charAt(0)}
            {toCapitalize(user.name).split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              <User2 size={20} />
            </span>
            <span>{toCapitalize(user.name)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              <Mail size={20} />
            </span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              <UserLock size={20} />
            </span>
            <span>{toCapitalize(user.role)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
