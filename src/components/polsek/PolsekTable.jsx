import { useState } from "react";
import { DataTable } from "./DataTable";
import PolsekFormModal from "./PolsekFormModal";
import { columns as baseColumns } from "./columns";

const PolsekTable = (props) => {
  const { data, loading, error, onSuccess } = props;
  const [editPolsek, setEditPolsek] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const columns = baseColumns({
    onEdit: (polsek) => {
      setEditPolsek(polsek);
      setModalOpen(true);
    },
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
    </div>
  );
};

export default PolsekTable;
