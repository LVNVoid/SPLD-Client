import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import useCrud from "@/hooks/useCrud";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Upload, X, Loader2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

export default function NarrativeForm({ reportId, initialData }) {
  const navigate = useNavigate();
  const isEditMode = Boolean(initialData);

  const { createData, updateData } = useCrud("/narratives");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("DRAFT");

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setStatus(initialData.status || "DRAFT");
      setExistingImages(initialData.images || []);
      setIsEditorReady(true);
    } else if (!isEditMode) {
      setIsEditorReady(true);
    }
  }, [initialData, isEditMode]);

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const total = imagePreviews.length + existingImages.length + files.length;
    if (total > 5) return toast.error("Maksimal 5 gambar");

    setImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeNewImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index].url);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (imageId) => {
    setLoading(true);
    try {
      await api.delete(`/upload/narrative/image/${imageId}`);
      toast.success("Gambar dihapus");
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error("Gagal menghapus gambar:", err);
      toast.error("Gagal menghapus gambar");
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (narrativeId) => {
    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));

    await api.post(`/upload/narrative/${narrativeId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Gambar berhasil diunggah");
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setStatus("DRAFT");
    setImages([]);
    setImagePreviews([]);
    setExistingImages([]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!reportId && !isEditMode) throw new Error("Report ID tidak tersedia");

      let narrativeId = initialData?.id;
      let result;

      if (isEditMode) {
        result = await updateData(narrativeId, {
          title,
          content,
          status,
        });
      } else {
        result = await createData({
          title,
          content,
          status,
          reportId,
          images: [],
        });
        narrativeId = result.id;
      }

      if (images.length > 0) {
        await uploadImages(narrativeId);
      }

      toast.success(
        isEditMode
          ? "Narasi berhasil diperbarui"
          : "Narasi berhasil ditambahkan"
      );
      resetForm();
      navigate(-1);
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
          <Label htmlFor="title">Judul</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Deskripsi</Label>
          {isEditorReady ? (
            <RichTextEditor
              id="content"
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="Masukkan deskripsi..."
            />
          ) : (
            <div className="h-[200px] w-full border rounded-md flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Publikasi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Dokumentasi <Badge variant="secondary">Maks 5</Badge>
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

          {existingImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {existingImages.map((img) => (
                <div key={img.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={img.url}
                      alt={img.alt || "Gambar"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    disabled={loading}
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => handleDeleteExistingImage(img.id)}
                  >
                    {loading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}

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
                    onClick={() => removeNewImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
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
                Menyimpan...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {isEditMode ? "Simpan Perubahan" : "Tambah Narasi"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
