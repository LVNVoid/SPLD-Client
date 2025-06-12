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

const UserFormModal = ({
  trigger,
  onSuccess,
  userData = null,
  open,
  onOpenChange,
}) => {
  const { createData, updateData, createLoading, updateLoading, error } =
    useCrud("/users");

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

  const modalOpen = open !== undefined ? open : isOpen;
  const setModalOpen = onOpenChange || setIsOpen;

  useEffect(() => {
    if (modalOpen) {
      if (userData) {
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          password: "",
          role: userData.role || "",
          polsekId: userData.polsekId ? String(userData.polsekId) : "",
        });
      } else {
        resetForm();
      }
    }
  }, [modalOpen, userData]);

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
      {
        condition: !userData && !formData.password.trim(),
        message: "Password harus diisi",
      },
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
      role: formData.role,
    };

    if (!userData) payload.password = formData.password;
    if (formData.role === "POLSEK") payload.polsekId = formData.polsekId;

    try {
      if (userData) {
        await updateData(userData.id, payload);
        toast.success("Pengguna berhasil diperbarui");
      } else {
        await createData(payload);
        toast.success("Pengguna berhasil ditambahkan");
      }

      resetForm();
      setModalOpen(false);
      onSuccess?.();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Gagal memproses pengguna";
      toast.error(msg);
    }
  };

  const handleCancel = () => {
    resetForm();
    setModalOpen(false);
  };

  const renderPolsekSelect = () => (
    <div className="space-y-2">
      <Label htmlFor="polsekId">Pilih Polsek</Label>
      <Select
        value={formData.polsekId}
        onValueChange={handlePolsekChange}
        disabled={createLoading || updateLoading || polsekLoading}
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
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User2 className="h-5 w-5" />
            {userData ? "Edit Pengguna" : "Tambah Pengguna"}
          </DialogTitle>
          <DialogDescription>
            {userData
              ? "Perbarui informasi pengguna."
              : "Masukkan data pengguna yang ingin ditambahkan."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
              disabled={createLoading || updateLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              required
              disabled={createLoading || updateLoading}
            />
          </div>

          {!userData && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                required
                disabled={createLoading || updateLoading}
                minLength={6}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={handleRoleChange}
              disabled={createLoading || updateLoading}
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
              disabled={createLoading || updateLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createLoading || updateLoading}>
              {(createLoading || updateLoading) && (
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
