import { useState, useEffect } from "react";
import useCrud from "@/hooks/useCrud";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ImageIcon,
  Loader2,
  Upload,
  X,
  FileText,
  Calendar,
} from "lucide-react";

export default function ReportFormModal({
  open,
  onOpenChange,
  trigger,
  reportData = null,
  onSuccess,
}) {
  const { createData, updateData } = useCrud("/reports");

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle controlled/uncontrolled state
  const modalOpen = open !== undefined ? open : isOpen;
  const setModalOpen = onOpenChange || setIsOpen;

  // Initialize form with reportData when modal opens or reportData changes
  useEffect(() => {
    if (modalOpen) {
      if (reportData) {
        // Mode edit - isi form dengan data laporan
        setTitle(reportData.title || "");
        setDescription(reportData.description || "");
        setDate(reportData.date || new Date().toISOString().split("T")[0]);

        // Set existing images and create previews
        const existing =
          reportData.images?.map((img) => ({
            url: img.url,
            name: img.name || `Gambar ${img.id}`,
            id: img.id,
            isExisting: true,
          })) || [];

        setExistingImages(existing);
        setImagePreviews(existing);
      } else {
        // Mode create - reset form
        setTitle("");
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
        setExistingImages([]);
        setImagePreviews([]);
      }
      setImages([]);
      setError(null);
    }
  }, [modalOpen, reportData]);

  const uploadImages = async (reportId, files) => {
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("images", file);
      }

      const res = await api.post(`/upload/report/${reportId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Gambar berhasil diunggah");
      return res.data;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Gagal mengunggah gambar");
      const message =
        error.response?.data?.message ||
        error.message ||
        "Gagal mengunggah gambar";
      throw new Error(message);
    }
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const totalImages =
      imagePreviews.filter((p) => !p.isExisting).length + files.length;

    if (totalImages > 5) {
      toast.error("Maksimal 5 gambar yang dapat diunggah");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    // Create previews for new files
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      isNew: true,
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const previewToRemove = imagePreviews[index];

    if (previewToRemove.isNew) {
      // Remove from new images array
      setImages((prev) =>
        prev.filter(
          (_, i) => i !== index - imagePreviews.filter((p) => !p.isNew).length
        )
      );
    } else {
      // Mark existing image for deletion
      setExistingImages((prev) =>
        prev.map((img) =>
          img.id === previewToRemove.id
            ? { ...img, markedForDeletion: true }
            : img
        )
      );
    }

    // Revoke the URL to prevent memory leaks if it's a new image
    if (previewToRemove.isNew) {
      URL.revokeObjectURL(previewToRemove.url);
    }

    // Remove from previews
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setImages([]);
    setExistingImages([]);
    setError(null);
    setLoading(false);

    // Clean up image previews URLs
    imagePreviews.forEach((preview) => {
      if (preview.isNew) {
        URL.revokeObjectURL(preview.url);
      }
    });
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (reportData) {
        // Update existing report
        const updatedReport = await updateData(reportData.id, {
          title,
          description,
          date,
          // Send only images that are not marked for deletion
          images: existingImages.filter((img) => !img.markedForDeletion),
        });

        // Upload new images if any
        if (images.length > 0) {
          await uploadImages(updatedReport.id, images);
        }

        toast.success("Laporan berhasil diperbarui");
        onSuccess?.();
      } else {
        // Create new report
        const newReport = await createData({
          title,
          description,
          date,
          images: [],
        });

        if (images.length > 0) {
          await uploadImages(newReport.id, images);
        }

        toast.success("Laporan berhasil ditambahkan");
        onSuccess?.();
      }

      setModalOpen(false);
      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Gagal memproses laporan"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open) => {
    setModalOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {reportData ? "Edit Laporan" : "Tambah Laporan Baru"}
          </DialogTitle>
          <DialogDescription>
            {reportData
              ? "Perbarui informasi laporan di bawah ini."
              : "Lengkapi formulir di bawah ini untuk menambahkan laporan baru ke sistem."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Judul Laporan
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul laporan..."
                required
                className="w-full"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Deskripsi
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan detail laporan..."
                rows={4}
                required
                className="w-full h-[120px] resize-none"
              />
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Tanggal
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Image Upload Field */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Gambar Pendukung
                <Badge variant="secondary" className="text-xs">
                  Maks 5 file
                </Badge>
              </Label>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 " />
                  <div className="text-sm text-muted-foreground">
                    <Label
                      htmlFor="images"
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                    >
                      Klik untuk memilih file
                    </Label>
                    {" atau drag & drop"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, JPEG hingga 10MB
                  </p>
                </div>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={preview.id || preview.name}
                      className="relative group"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden border">
                        <img
                          src={preview.url}
                          alt={preview.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1 truncate text-center">
                        {preview.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-4 sticky bottom-0 border-t -mx-6 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="flex-1"
                disabled={loading}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {reportData ? "Menyimpan..." : "Mengirim..."}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {reportData ? "Simpan Perubahan" : "Tambah Laporan"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
