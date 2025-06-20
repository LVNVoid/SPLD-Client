import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, PlusCircle, Search } from "lucide-react";
import useCrud from "@/hooks/useCrud";
import ReportTable from "@/components/report/ReportTable";
import ReportFormModal from "@/components/report/ReportFormModal";
import toast from "react-hot-toast";
import ReportTableSkeleton from "@/components/report/ReportTableSkeleton";
import { useSelector } from "react-redux";

export default function ReportPage() {
  const { user } = useSelector((state) => state.userState);
  const isPolsek = user?.role === "POLSEK" || user?.role === "ADMIN";

  const [searchQuery, setSearchQuery] = useState("");
  const { data: reports, loading, error, refreshData } = useCrud("/reports");

  const handleSuccess = () => {
    refreshData();
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleDeleteSuccess = () => {
    refreshData();
    toast.success("Data laporan berhasil dihapus");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg md:text-2xl font-bold">Laporan</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Kelola dan lihat semua laporan dalam sistem. Anda dapat mencari dan
          menambahkan laporan baru.
        </p>
      </div>
      <div className="flex md:flex-row gap-4 mb-6 justify-between items-center">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari laporan..."
            className="text-sm md:text-base pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {isPolsek && (
          <ReportFormModal
            trigger={
              <Button>
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only md:not-sr-only">Tambah Laporan</span>
              </Button>
            }
            onSuccess={handleSuccess}
          />
        )}
      </div>

      <div className="rounded-md border">
        {error && (
          <p className="text-center font-bold p-4 text-destructive">{error}</p>
        )}
        {loading ? (
          <ReportTableSkeleton />
        ) : (
          <ReportTable
            reports={filteredReports}
            onSuccess={handleDeleteSuccess}
            isPolsek={isPolsek}
          />
        )}
      </div>
    </div>
  );
}
