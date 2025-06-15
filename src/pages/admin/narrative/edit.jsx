import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCrud from "@/hooks/useCrud";
import NarrativeForm from "@/components/narrative/NarrativeForm";

const EditNarrativePage = () => {
  const { id } = useParams();
  const { getData, detailLoading, error, clearError } = useCrud("/narratives");
  const [narrative, setNarrative] = useState(null);

  useEffect(() => {
    if (id) {
      fetchNarrative();
    }
  }, [id]);

  const fetchNarrative = async () => {
    try {
      clearError();
      const data = await getData(id);
      setNarrative(data);
    } catch (err) {
      console.error("Gagal mengambil data narasi", err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Edit Narasi</h1>
        <p className="text-muted-foreground">
          Ubah informasi narasi di bawah ini.
        </p>
      </div>

      {detailLoading ? (
        <p className="text-muted-foreground text-sm">Memuat data narasi...</p>
      ) : narrative ? (
        <NarrativeForm
          mode="edit"
          initialData={narrative}
          reportId={narrative.reportId}
        />
      ) : (
        <p className="text-red-500 text-sm">
          {error || "Narasi tidak ditemukan."}
        </p>
      )}
    </div>
  );
};

export default EditNarrativePage;
