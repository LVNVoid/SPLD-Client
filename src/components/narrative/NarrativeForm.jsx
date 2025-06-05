import { useState } from "react";
import useCrud from "@/hooks/useCrud";
import api from "@/lib/axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { ImageIcon, Upload, X, Loader2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NarrativeForm({ reportId }) {
  const { createData } = useCrud("/narratives");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const total = imagePreviews.length + files.length;
    if (total > 5) return toast.error("Maksimal 5 gambar");

    setImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index].url);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImages([]);
    setImagePreviews([]);
    setError(null);
    setLoading(false);
  };

  const uploadImages = async (narrativeId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    try {
      await api.post(`/upload/narrative/${narrativeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Gambar berhasil diunggah");
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
      throw new Error(error.response?.data?.message || "Upload gagal");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!reportId) throw new Error("Report ID tidak tersedia.");

      const created = await createData({
        title,
        content,
        reportId,
        images: [],
      });

      if (images.length > 0) {
        await uploadImages(created.id, images);
      }

      toast.success("Narasi berhasil ditambahkan");
      resetForm();
      navigate(-1); // kembali ke halaman sebelumnya
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Narasi</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Isi Narasi</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan isi narasi..."
            rows={4}
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Gambar Pendukung <Badge variant="secondary">Maks 5</Badge>
          </Label>

          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-6 w-6" />
              <Label
                htmlFor="narrativeImages"
                className="text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                Klik untuk pilih file
              </Label>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, JPEG hingga 10MB
              </p>
            </div>
            <Input
              id="narrativeImages"
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
                <div key={preview.name} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 opacity-0 group-hover:opacity-100"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <p className="text-xs mt-1 truncate text-center">
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

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={loading}
            className="flex-1"
          >
            Batal
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Tambah Narasi
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
