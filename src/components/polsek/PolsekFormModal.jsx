import useCrud from "@/hooks/useCrud";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

const PolsekFormModal = (props) => {
  const { open, onOpenChange, trigger, polsekData = null, onSuccess } = props;

  const { createData, updateData, createLoading, updateLoading, error } =
    useCrud("/polseks");

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const modalOpen = open !== undefined ? open : isOpen;
  const setModalOpen = onOpenChange || setIsOpen;

  useEffect(() => {
    if (modalOpen) {
      if (polsekData) {
        setName(polsekData.name || "");
      } else {
        setName("");
      }
    }
  }, [modalOpen, polsekData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (polsekData) {
        await updateData(polsekData.id, { name });
        toast.success("Polsek berhasil diperbarui");
      } else {
        await createData({ name });
        toast.success("Polsek berhasil ditambahkan");
      }

      onSuccess?.();
      setModalOpen(false);
      setName("");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Gagal memproses polsek";
      toast.error(msg);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent showCloseButton={false} className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {polsekData ? "Edit data Polsek" : "Tambah data Polsek"}
          </DialogTitle>
          <DialogDescription>
            {polsekData
              ? "Perbarui data polsek"
              : "Lengkapi formulir di bawah ini untuk menambahkan polsek baru ke sistem."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label htmlFor="name">Nama Polsek</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={createLoading || updateLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createLoading || updateLoading}>
              {createLoading || updateLoading ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PolsekFormModal;
