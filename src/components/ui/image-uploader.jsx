import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ImageUploader({ value = [], onChange, maxFiles = 5 }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length + value.length > maxFiles) {
        alert(`Maksimal ${maxFiles} gambar yang diizinkan`);
        return;
      }

      const newImages = acceptedFiles.map((file, index) => ({
        file,
        url: URL.createObjectURL(file), // Preview lokal
        filename: file.name,
        alt: "",
        caption: "",
        order: value.length + index,
      }));

      onChange([...value, ...newImages]);
    },
    [value, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: maxFiles - value.length,
    disabled: value.length >= maxFiles,
  });

  const removeImage = (index) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const updateImage = (index, field, newValue) => {
    const newImages = [...value];
    newImages[index] = { ...newImages[index], [field]: newValue };
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
          isDragActive ? "border-primary bg-primary/10" : "border-muted"
        } ${value.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="h-8 w-8 text-muted-foreground" />
          {isDragActive ? (
            <p className="font-medium">Letakkan gambar di sini...</p>
          ) : (
            <p className="font-medium">
              Seret & lepas gambar di sini, atau klik untuk memilih
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Format: JPEG, JPG, PNG, WEBP (maks. {maxFiles} gambar)
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {value.map((image, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <img
                  src={image.url}
                  alt={image.alt || "Preview"}
                  className="h-32 w-full object-cover rounded"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Teks alternatif (alt)"
                  value={image.alt || ""}
                  onChange={(e) => updateImage(index, "alt", e.target.value)}
                />
                <Input
                  placeholder="Keterangan (caption)"
                  value={image.caption || ""}
                  onChange={(e) =>
                    updateImage(index, "caption", e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Urutan"
                  value={image.order || 0}
                  onChange={(e) =>
                    updateImage(index, "order", parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
