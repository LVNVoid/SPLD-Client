import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserFormModal from "@/components/user/UserFormModal";
import UserTable from "@/components/user/UserTable";
import useCrud from "@/hooks/useCrud";
import { PlusCircle, Search } from "lucide-react";
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
    <div className="space-y-4">
      <div>
        <h1 className="text-lg md:text-2xl font-bold">Data Pengguna</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Kelola dan lihat semua pengguna dalam sistem.
        </p>
        <div className="flex md:flex-row gap-4 mb-6 mt-4 justify-between items-center">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari Nama Pengguna..."
              className="text-sm md:text-base pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <UserFormModal
            trigger={
              <Button>
                <PlusCircle className="h-4 w-4" size={"sm"} />
                <span className="sr-only md:not-sr-only">Tambah Pengguna</span>
              </Button>
            }
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
