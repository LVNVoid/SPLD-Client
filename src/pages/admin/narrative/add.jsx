import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import useCrud from "@/hooks/useCrud";
import { DockIcon, File, FileText, Sheet } from "lucide-react";
import NarrativeForm from "@/components/narrative/NarrativeForm";

const CreateNarrativePage = () => {
  const { id: reportId } = useParams();
  const [report, setReport] = useState(null);

  const { getData, detailLoading, clearError, error } = useCrud("/reports");

  useEffect(() => {
    if (reportId) {
      fetchReportDetail();
    }
  }, [reportId]);

  const fetchReportDetail = async () => {
    try {
      clearError();
      const data = await getData(reportId);
      setReport(data);
    } catch (err) {
      console.error("Error fetching report detail:", err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Buat Narasi</h1>
        <p className="text-muted-foreground">
          Lengkapi formulir di bawah ini untuk menambahkan narasi ke laporan.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Form */}
        <div className="md:w-1/2 w-full">
          <NarrativeForm reportId={reportId} />
        </div>

        {/* Deskripsi laporan */}
        <div className="md:w-1/2 w-full space-y-4 border rounded-md p-4">
          <h2 className="flex items-center text-xl font-semibold">
            <FileText className="mr-2 h-4 w-4" />
            Laporan terkait
          </h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {detailLoading ? (
            <p className="text-muted-foreground text-sm">
              Memuat detail laporan...
            </p>
          ) : report ? (
            <>
              <h3 className="font-medium text-lg">{report.title}</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {report.description}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              Data laporan tidak tersedia.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNarrativePage;
