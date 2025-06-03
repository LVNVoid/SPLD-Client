import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCrud from "@/hooks/useCrud";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  FileText,
  ImageIcon,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import ReportDetailSkeleton from "@/components/report/ReportDetailSkeleton";

export default function DetailReportPage() {
  const { id: reportId } = useParams();
  const navigate = useNavigate();

  const { getData, detailLoading, error, clearError } = useCrud("/reports", {
    autoFetch: false,
  });

  const [report, setReport] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === report.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? report.images.length - 1 : prev - 1
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: report.title,
          text: report.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleRefresh = () => {
    fetchReportDetail();
  };

  if (detailLoading) {
    return <ReportDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={() => navigate("/admin/report")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Laporan
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert>
          <AlertDescription>Laporan tidak ditemukan</AlertDescription>
        </Alert>
        <Button
          variant="outline"
          onClick={() => navigate("/admin/report")}
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Daftar Laporan
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/admin/report")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={detailLoading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${detailLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Bagikan
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold leading-tight">
                {report.title}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(report.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  ID: {report.id}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Deskripsi Laporan</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {report.description}
              </p>
            </div>
          </div>

          {/* Images Gallery */}
          {report.images && report.images.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Gambar Pendukung
                </h3>
                <Badge variant="outline">{report.images.length} gambar</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer rounded-lg overflow-hidden border bg-gray-50 aspect-square"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Gambar ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Images State */}
          {(!report.images || report.images.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Tidak ada gambar pendukung</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Modal/Lightbox */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="relative">
            <img
              src={
                report.images?.[selectedImageIndex]?.url || "/placeholder.svg"
              }
              alt={`Gambar ${selectedImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            {/* Navigation Buttons */}
            {report.images && report.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Badge variant="secondary">
                {selectedImageIndex + 1} / {report.images?.length || 0}
              </Badge>
            </div>

            {/* Download Button */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => {
                const link = document.createElement("a");
                link.href = report.images[selectedImageIndex].url;
                link.download = `laporan-${report.id}-gambar-${
                  selectedImageIndex + 1
                }`;
                link.click();
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
