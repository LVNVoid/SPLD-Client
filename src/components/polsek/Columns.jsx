import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const columns = ({ onEdit, onDelete, onView }) => [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorFn: (row) => row._count?.users ?? 0,
    header: "Jumlah Pengguna",
    id: "userCount",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const polsek = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(polsek.id)}
            >
              Copy Polsek ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onView?.(polsek)}>
              Lihat detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(polsek)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(polsek)}>
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
