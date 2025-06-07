import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatDate, truncateText } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import useCrud from "@/hooks/useCrud";
import DeleteModal from "../ui/delete-modal";
import ReportFormModal from "./ReportFormModal";
import toast from "react-hot-toast";

export default function ReportTable({ reports, onSuccess }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const { deleteData, deleteLoading } = useCrud("reports");

  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (report) => {
    setSelectedReport(report);
    setEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteData(selectedReport.id);
      onSuccess?.();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Gagal menghapus laporan:", error);
      toast.error("Gagal menghapus laporan");
    }
  };

  if (!reports.length) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-4 text-muted-foreground"
            >
              Tidak ada laporan yang ditemukan
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Judul Laporan</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Penulis</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.title}</TableCell>
              <TableCell className="font-medium">
                {truncateText(report.description, 50)}
              </TableCell>
              <TableCell>{formatDate(report.date)}</TableCell>
              <TableCell>{report.author?.polsek?.name ?? "-"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to={`/admin/report/${report.id}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        Lihat Detail
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleEditClick(report)}
                    >
                      Ubah Laporan
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                      onClick={() => handleDeleteClick(report)}
                    >
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteLoading}
        title="Hapus Laporan"
        description={`Anda akan menghapus laporan "${selectedReport?.title}". Tindakan ini tidak dapat dibatalkan.`}
      />

      <ReportFormModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        reportData={selectedReport}
        onSuccess={onSuccess}
      />
    </>
  );
}
