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
  User,
  PlusCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import ReportDetailSkeleton from "@/components/report/ReportDetailSkeleton";
import { useSelector } from "react-redux";

export default function DetailReportPage() {
  const { id: reportId } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userState);

  const isHumas = user?.role === "HUMAS" || user?.role === "ADMIN";

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
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
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
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/report")}
          className="self-start sm:self-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Kembali</span>
        </Button>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={detailLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${detailLoading ? "animate-spin" : ""}`}
            />
            <span className="sr-only sm:not-sr-only">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Bagikan</span>
          </Button>
          {isHumas && (
            <Button
              onClick={() => navigate(`/admin/narrative/add/${reportId}`)}
              size="sm"
              className="whitespace-nowrap"
            >
              <PlusCircle className="h4 w-4" />
              Buat Narasi
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-background">
        <CardHeader>
          <div className="space-y-4">
            <CardTitle className="text-xl md:text-2xl font-bold leading-tight">
              {report.title}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatDate(report.createdAt)}</span>
              </div>

              <div className="flex items-center gap-1">
                <User className="h-4 w-4 flex-shrink-0" />
                <span>{report.author.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="bg-gradient-to-r from-sky-400 to-indigo-600 rounded-full p-[2px] flex items-center justify-center">
                  <Badge className="bg-background hover:bg-background text-foreground rounded-full border-none">
                    {report.author.polsek?.name || "-"}
                  </Badge>
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
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
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
                  Dokumentasi laporan
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {report.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer rounded-lg overflow-hidden border aspect-square"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Gambar ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
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
        <DialogContent className="max-w-[95vw] w-full p-0 sm:max-w-4xl">
          <div className="relative">
            <img
              src={
                report.images?.[selectedImageIndex]?.url || "/placeholder.svg"
              }
              alt={`Gambar ${selectedImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
              loading="lazy"
            />

            {/* Navigation Buttons */}
            {report.images && report.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2"
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
              className="absolute top-2 sm:top-4 right-2 sm:right-4"
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
