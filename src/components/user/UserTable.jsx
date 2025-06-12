import { useState } from "react";
import DeleteModal from "../ui/delete-modal";
import { columns as baseColumns } from "./columns";
import { DataTable } from "./DataTable";
import toast from "react-hot-toast";
import useCrud from "@/hooks/useCrud";
import UserFormModal from "./UserFormModal";
import { useNavigate } from "react-router-dom";

const UserTable = (props) => {
  const { data, loading, error, onSuccess } = props;
  const navigate = useNavigate();
  const [deleteUser, setDeleteUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const { deleteData, deleteLoading } = useCrud("/users");

  const handleDelete = async () => {
    try {
      await deleteData(deleteUser.id);
      toast.success("Data berhasil dihapus");
      setDeleteUser(null);
      onSuccess?.();
    } catch (err) {
      toast.error("Gagal menghapus data");
      console.error(err);
    }
  };

  const columns = baseColumns({
    onEdit: (item) => {
      setEditUser(item);
      setModalOpen(true);
    },
    onView: (item) => navigate(`/admin/user/${item.id}`),
    onDelete: (item) => setDeleteUser(item),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <DataTable data={data} columns={columns} />
      <UserFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        userData={editUser}
        onSuccess={() => {
          setEditUser(null);
          onSuccess?.();
        }}
      />
      <DeleteModal
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDelete}
        isLoading={deleteLoading}
        title={`Hapus ${deleteUser?.name}?`}
        description="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default UserTable;
