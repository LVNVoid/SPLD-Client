import { FileTextIcon, BookIcon, UsersIcon, BuildingIcon } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import useCrud from "@/hooks/useCrud";

export default function DashboardPage() {
  const { data: stats, loading, error } = useCrud("/stats");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg md:text-2xl font-bold">Dashboard SPLD</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Ringkasan aktivitas pelaporan dan narasi
        </p>
      </div>

      <StatsCard
        isLoading={loading}
        error={error}
        stats={[
          {
            label: "Total Laporan",
            value: stats?.reports?.total || 0,
            icon: <FileTextIcon />,
          },
          {
            label: "Total Narasi",
            value: stats?.narratives?.total || 0,
            icon: <BookIcon />,
          },
          {
            label: "Total Polsek",
            value: stats?.polseks?.total || 0,
            icon: <BuildingIcon />,
          },
          {
            label: "Total Pengguna",
            value: stats?.users?.total || 0,
            icon: <UsersIcon />,
          },
        ]}
      />
    </div>
  );
}
