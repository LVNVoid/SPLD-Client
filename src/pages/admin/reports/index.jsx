import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import useCrud from "@/hooks/useCrud";
import ReportTable from "@/components/report/ReportTable";
import ReportFormModal from "@/components/report/ReportFormModal";

export default function ReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: reports, loading, error } = useCrud("reports");

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Laporan</h1>
        <p className="text-muted-foreground">
          Kelola dan lihat semua laporan dalam sistem. Anda dapat mencari,
          memfilter, dan menambahkan laporan baru.
        </p>
      </div>
      <div className="flex md:flex-row gap-4 mb-6 justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari laporan..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ReportFormModal
          trigger={
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Laporan
            </Button>
          }
        />
      </div>

      <div className="rounded-md border">
        <ReportTable reports={filteredReports} />
      </div>
    </div>
  );
}
