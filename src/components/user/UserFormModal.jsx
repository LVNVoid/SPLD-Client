import { useState, useEffect } from "react";
import useCrud from "@/hooks/useCrud";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Loader2, User2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import api from "@/lib/axios";

const UserFormModal = ({ trigger, onSuccess }) => {
  const { createData, createLoading, error } = useCrud("/users");

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    polsekId: "",
  });
  const [polseks, setPolseks] = useState([]);
  const [polsekLoading, setPolsekLoading] = useState(false);

  useEffect(() => {
    const fetchPolseks = async () => {
      if (formData.role !== "POLSEK") return;

      setPolsekLoading(true);
      try {
        const res = await api.get("/polseks");
        const polseksData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setPolseks(polseksData);
      } catch (err) {
        console.error("Error fetching polseks:", err);
        toast.error("Gagal mengambil data Polsek");
        setPolseks([]);
      } finally {
        setPolsekLoading(false);
      }
    };

    fetchPolseks();
  }, [formData.role]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value, polsekId: "" }));
  };

  const handlePolsekChange = (value) => {
    setFormData((prev) => ({ ...prev, polsekId: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      polsekId: "",
    });
  };

  const validateForm = () => {
    const validations = [
      { condition: !formData.name.trim(), message: "Nama harus diisi" },
      { condition: !formData.email.trim(), message: "Email harus diisi" },
      { condition: !formData.password.trim(), message: "Password harus diisi" },
      { condition: !formData.role, message: "Role harus dipilih" },
      {
        condition: formData.role === "POLSEK" && !formData.polsekId,
        message: "Polsek harus dipilih",
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        toast.error(validation.message);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "POLSEK") {
      payload.polsekId = formData.polsekId;
    }

    try {
      await createData(payload);
      toast.success("Pengguna berhasil ditambahkan");
      resetForm();
      setIsOpen(false);
      onSuccess?.();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Gagal menambahkan pengguna";
      toast.error(msg);
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsOpen(false);
  };

  const renderPolsekSelect = () => (
    <div>
      <Label htmlFor="polsekId">
        Pilih Polsek <span className="text-red-500">*</span>
      </Label>
      <Select
        value={formData.polsekId}
        onValueChange={handlePolsekChange}
        disabled={createLoading || polsekLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={polsekLoading ? "Memuat..." : "Pilih Polsek"}
          />
        </SelectTrigger>
        <SelectContent>
          {polsekLoading ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Memuat data...
            </div>
          ) : Array.isArray(polseks) && polseks.length > 0 ? (
            <SelectGroup>
              <SelectLabel>Polsek</SelectLabel>
              {polseks.map((polsek) => (
                <SelectItem key={polsek.id} value={String(polsek.id)}>
                  {polsek.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ) : (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              Tidak ada data Polsek tersedia
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User2 className="h-5 w-5" />
            Tambah Pengguna
          </DialogTitle>
          <DialogDescription>
            Masukkan data pengguna yang ingin ditambahkan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">
              Nama <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
              disabled={createLoading}
            />
          </div>

          <div>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              required
              disabled={createLoading}
            />
          </div>

          <div>
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
              disabled={createLoading}
              minLength={6}
            />
          </div>

          <div>
            <Label htmlFor="role">
              Role <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.role}
              onValueChange={handleRoleChange}
              disabled={createLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="HUMAS">Humas</SelectItem>
                  <SelectItem value="POLSEK">Polsek</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {formData.role === "POLSEK" && renderPolsekSelect()}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 justify-end mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={createLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createLoading}>
              {createLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormModal;
