import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, BookText, Clock, Check, X } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: "Total Laporan",
      value: 128,
    },
    {
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      label: "Menunggu Validasi",
      value: 14,
    },
    {
      icon: <Check className="h-5 w-5 text-green-600" />,
      label: "Narasi Disetujui",
      value: 89,
    },
    {
      icon: <X className="h-5 w-5 text-red-600" />,
      label: "Narasi Ditolak",
      value: 5,
    },
  ];

  const handleAddReport = () => {
    // Navigasi ke form tambah laporan
    window.location.href = "/laporan/tambah";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Dashboard SPLD</h1>
      <p className="text-muted-foreground mb-6">
        Ringkasan aktivitas pelaporan dan narasi humas
      </p>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card className="bg-background" key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Aksi Cepat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
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
      </div>

      {/* Aktivitas Terbaru (opsional) */}
      <Card className="bg-background">
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
      </Card>
    </div>
  );
}
