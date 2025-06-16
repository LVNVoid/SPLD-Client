import PolsekFormModal from "@/components/polsek/PolsekFormModal";
import PolsekTable from "@/components/polsek/PolsekTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCrud from "@/hooks/useCrud";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";

const PolsekPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error, refreshData } = useCrud("/polseks");

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
        <h1 className="text-lg md:text-2xl font-bold">Data Polsek</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Kelola dan lihat semua polsek dalam sistem.
        </p>
      </div>
      <div className="flex md:flex-row gap-4 mb-6 justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama polsek..."
            className="text-sm md:text-base pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <PolsekFormModal
          trigger={
            <Button>
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Tambah Polsek</span>
            </Button>
          }
          onSuccess={handleSuccess}
        />
      </div>
      <PolsekTable
        data={filteredReports}
        loading={loading}
        error={error}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default PolsekPage;
