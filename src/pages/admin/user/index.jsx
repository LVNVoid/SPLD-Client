import UserTable from "@/components/user/UserTable";
import React from "react";

const UserPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Data Pengguna</h1>
        <p className="text-muted-foreground">
          Kelola dan lihat semua pengguna dalam sistem.
        </p>
      </div>
      <UserTable />
    </div>
  );
};

export default UserPage;
