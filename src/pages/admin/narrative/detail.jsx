import NarrativeDetail from "@/components/narrative/NarrativeDetail";
import useCrud from "@/hooks/useCrud";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailNarrativePage = () => {
  const { id: narrativeId } = useParams();
  const { getData, detailLoading, error } = useCrud("/narratives", {
    autoFetch: false,
  });

  const [narrative, setNarrative] = useState(null);

  useEffect(() => {
    if (narrativeId) {
      getData(narrativeId).then(setNarrative).catch(console.error);
    }
  }, [narrativeId, getData]);

  if (detailLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="px-4 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link
          to="/admin/narrative"
          className="flex items-center gap-2 text-primary"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-primary" />
          <span className="text-primary text-sm md:text-md font-semibold">
            Kembali ke Daftar Narasi
          </span>
        </Link>

        {narrative && <NarrativeDetail narrative={narrative} />}
      </div>
    </div>
  );
};

export default DetailNarrativePage;
