import NarrativeTable from "@/components/narrative/NarrativeTable";
import NarrativeTableSkeleton from "@/components/narrative/NarrativeTableSkeleton";
import { Input } from "@/components/ui/input";
import useCrud from "@/hooks/useCrud";
import { Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const NarrativePage = () => {
  const { user } = useSelector((state) => state.userState);

  const isHumas = user?.role === "HUMAS" || user?.role === "ADMIN";

  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: narratives,
    loading,
    error,
    refreshData,
  } = useCrud("/narratives");

  const filteredNarratives = narratives.filter((narrative) => {
    const matchesSearch =
      narrative.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      narrative.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleDeleteSuccess = () => {
    refreshData();
    toast.success("Data narasi berhasil dihapus");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg md:text-2xl font-bold">Narasi</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Kelola dan lihat semua narasi dalam sistem. Anda dapat mencari dan
          menambahkan narasi baru.
        </p>
      </div>
      <div className="flex md:flex-row gap-4 mb-6 justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari narasi..."
            className="text-sm md:text-base pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        {error && (
          <p className="text-center font-bold p-4 text-destructive">{error}</p>
        )}
        {loading ? (
          <NarrativeTableSkeleton />
        ) : (
          <NarrativeTable
            onDeleteSuccess={handleDeleteSuccess}
            narratives={filteredNarratives}
            isHumas={isHumas}
          />
        )}
      </div>
    </div>
  );
};

export default NarrativePage;
