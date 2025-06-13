import { useState } from "react";
import { DataTable } from "./DataTable";
import PolsekFormModal from "./PolsekFormModal";
import { columns as baseColumns } from "./Columns";
import useCrud from "@/hooks/useCrud";
import toast from "react-hot-toast";
import DeleteModal from "../ui/delete-modal";
import PolsekDetailModal from "./PolsekDetailModal";

const PolsekTable = (props) => {
  const { data, loading, error, onSuccess } = props;

  const [deletePolsek, setDeletePolsek] = useState(null);
  const [viewPolsek, setViewPolsek] = useState(null);
  const [editPolsek, setEditPolsek] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { deleteData, deleteLoading } = useCrud("/polseks");

  const handleDelete = async () => {
    try {
      await deleteData(deletePolsek.id);
      toast.success("Data berhasil dihapus");
      setDeletePolsek(null);
      onSuccess?.();
    } catch (err) {
      toast.error("Gagal menghapus data");
      console.error(err);
    }
  };

  const columns = baseColumns({
    onEdit: (item) => {
      setEditPolsek(item);
      setModalOpen(true);
    },
    onView: (item) => setViewPolsek(item),
    onDelete: (item) => setDeletePolsek(item),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <DataTable data={data} columns={columns} />
      <PolsekFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        polsekData={editPolsek}
        onSuccess={() => {
          setEditPolsek(null);
          onSuccess?.();
        }}
      />

      <PolsekDetailModal
        id={viewPolsek?.id}
        onClose={() => setViewPolsek(null)}
      />

      <DeleteModal
        isOpen={!!deletePolsek}
        onClose={() => setDeletePolsek(null)}
        onConfirm={handleDelete}
        isLoading={deleteLoading}
        title={`Hapus ${deletePolsek?.name}?`}
        description="Apakah Anda yakin ingin menghapus polsek ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default PolsekTable;
