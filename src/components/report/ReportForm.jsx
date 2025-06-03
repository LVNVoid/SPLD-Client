import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCrud from "@/hooks/useCrud";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  ImageIcon,
  Loader2,
  Upload,
  X,
  FileText,
  Calendar,
} from "lucide-react";

export default function ReportForm() {
  const navigate = useNavigate();
  const { createData } = useCrud("/reports");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

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
    if (files.length > 5) {
      toast.error("Maksimal 5 gambar yang dapat diunggah");
      return;
    }

    setImages(files);

    // Create previews
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index].url);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
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
      navigate("/admin/report");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal menambahkan laporan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tambah Laporan Baru
          </CardTitle>
          <CardDescription>
            Lengkapi formulir di bawah ini untuk menambahkan laporan baru ke
            sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                className="w-full resize-none"
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

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <Label
                      htmlFor="images"
                      className="cursor-pointer text-blue-600 hover:text-blue-500"
                    >
                      Klik untuk memilih file
                    </Label>
                    {" atau drag & drop"}
                  </div>
                  <p className="text-xs text-gray-500">
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

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border bg-gray-50">
                        <img
                          src={preview.url || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {preview.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/report")}
                className="flex-1"
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Tambah Laporan
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
