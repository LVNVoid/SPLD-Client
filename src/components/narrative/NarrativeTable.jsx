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

export default function NarrativeTable({
  narratives,
  onDeleteSuccess,
  isHumas,
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  //   const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedNarrative, setSelectedNarrative] = useState(null);
  const { deleteData, deleteLoading } = useCrud("narratives");

  const handleDeleteClick = (narrative) => {
    setSelectedNarrative(narrative);
    setDeleteModalOpen(true);
  };

  //   const handleEditClick = (narrative) => {
  //     setSelectedNarrative(narrative);
  //     setEditModalOpen(true);
  //   };

  const handleConfirmDelete = async () => {
    try {
      await deleteData(selectedNarrative.id);
      onDeleteSuccess?.();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Gagal menghapus narasi:", error);
    }
  };

  if (!narratives.length) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-4 text-muted-foreground"
            >
              Tidak ada narasi yang ditemukan
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
            <TableHead>Judul Narasi</TableHead>
            <TableHead>Konten</TableHead>
            <TableHead>Tanggal Publikasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Penulis</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {narratives.map((narrative) => (
            <TableRow key={narrative.id}>
              <TableCell className="font-medium">{narrative.title}</TableCell>
              <TableCell>{truncateText(narrative.content, 50)}</TableCell>
              <TableCell>
                {narrative.publishedAt
                  ? formatDate(narrative.publishedAt)
                  : "-"}
              </TableCell>
              <TableCell>{narrative.status}</TableCell>
              <TableCell>{narrative.author?.name ?? "-"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to={`/admin/narrative/${narrative.id}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        Lihat detail
                      </DropdownMenuItem>
                    </Link>
                    {/* Only humas and admin can edit or delete */}
                    {isHumas && (
                      <>
                        <Link to={`/admin/narrative/edit/${narrative.id}`}>
                          <DropdownMenuItem className="cursor-pointer">
                            Ubah Narasi
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-destructive cursor-pointer"
                          onClick={() => handleDeleteClick(narrative)}
                        >
                          Hapus
                        </DropdownMenuItem>
                      </>
                    )}
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
        title="Hapus Narasi"
        description={`Anda akan menghapus narasi "${selectedNarrative?.title}". Tindakan ini tidak dapat dibatalkan.`}
      />
    </>
  );
}
