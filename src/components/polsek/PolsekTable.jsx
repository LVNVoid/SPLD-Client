import useCrud from "@/hooks/useCrud";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";

const PolsekTable = () => {
  const { data, loading, error } = useCrud("/polseks");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default PolsekTable;
