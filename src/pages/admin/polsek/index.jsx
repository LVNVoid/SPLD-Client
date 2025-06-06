import PolsekTable from "@/components/polsek/PolsekTable";

const PolsekPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Data Polsek</h1>
        <p className="text-muted-foreground">
          Kelola dan lihat semua polsek dalam sistem.
        </p>
      </div>
      <PolsekTable />
    </div>
  );
};

export default PolsekPage;
