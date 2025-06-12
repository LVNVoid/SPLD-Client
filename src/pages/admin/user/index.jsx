import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserFormModal from "@/components/user/UserFormModal";
import UserTable from "@/components/user/UserTable";
import useCrud from "@/hooks/useCrud";
import { Search } from "lucide-react";
import React, { useState } from "react";

const UserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error, refreshData } = useCrud("/users");

  const handleSuccess = () => {
    refreshData();
  };

  const filteredReports = data.filter((data) => {
    const matchesSearch = data.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Data Pengguna</h1>
        <p className="text-muted-foreground">
          Kelola dan lihat semua pengguna dalam sistem.
        </p>
        <div className="flex md:flex-row gap-4 mb-6 mt-4 justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari Nama Pengguna..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <UserFormModal
            trigger={<Button>Tambah Pengguna</Button>}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
      <UserTable
        data={filteredReports}
        loading={loading}
        error={error}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default UserPage;
