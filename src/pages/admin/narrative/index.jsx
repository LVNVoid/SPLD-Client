import NarrativeTable from "@/components/narrative/NarrativeTable";
import NarrativeTableSkeleton from "@/components/narrative/NarrativeTableSkeleton";
import { Input } from "@/components/ui/input";
import useCrud from "@/hooks/useCrud";
import { Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NarrativePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: narratives,
    loading,
    error,
    refreshData,
  } = useCrud("/narratives");

  // const handleSuccess = () => {
  //   refreshData();
  //   toast.success("Data narasi berhasil disimpan");
  // };

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
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Narasi</h1>
        <p className="text-muted-foreground">
          Kelola dan lihat semua narasi dalam sistem. Anda dapat mencari dan
          menambahkan narasi baru.
        </p>
      </div>
      <div className="flex md:flex-row gap-4 mb-6 justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari narasi..."
            className="pl-8"
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
          />
        )}
      </div>
    </div>
  );
};

export default NarrativePage;
