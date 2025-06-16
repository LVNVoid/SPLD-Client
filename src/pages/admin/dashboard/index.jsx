import { FileTextIcon, BookIcon, UsersIcon, BuildingIcon } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import useCrud from "@/hooks/useCrud";

export default function DashboardPage() {
  const { data: stats, loading, error } = useCrud("/stats");

  console.log(stats);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg md:text-2xl font-bold">Dashboard SPLD</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Ringkasan aktivitas pelaporan dan narasi
        </p>
      </div>

      <div>
        <StatsCard
          stats={[
            {
              label: "Total Laporan",
              value: stats?.data?.reports.total || 0,
              icon: <FileTextIcon />,
            },
            {
              label: "Total Narasi",
              value: stats?.data?.narratives.total || 0,
              icon: <BookIcon />,
            },
            {
              label: "Total Polsek",
              value: stats?.data?.polseks.total || 0,
              icon: <BuildingIcon />,
            },
            {
              label: "Total Pengguna",
              value: stats?.data?.users.total || 0,
              icon: <UsersIcon />,
            },
          ]}
        />
      </div>

      {/* Aksi Cepat */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handleAddReport}
              className="w-full justify-start"
              variant="default"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Laporan
            </Button>
            <Button
              onClick={() => (window.location.href = "/laporan")}
              className="w-full justify-start"
              variant="outline"
            >
              <FileText className="mr-2 h-4 w-4" />
              Lihat Semua Laporan
            </Button>
            <Button
              onClick={() => (window.location.href = "/narasi")}
              className="w-full justify-start"
              variant="outline"
            >
              <BookText className="mr-2 h-4 w-4" />
              Kelola Narasi
            </Button>
          </CardContent>
        </Card>
      </div> */}

      {/* Aktivitas Terbaru (opsional) */}
      {/* <Card className="bg-background">
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>- Laporan dari Polsek A telah dibuat (2 jam lalu)</li>
            <li>- Narasi baru dikirimkan oleh Humas Polres</li>
            <li>- Narasi dari Laporan 123 disetujui</li>
          </ul>
        </CardContent>
      </Card> */}
    </div>
  );
}
