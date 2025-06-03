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

export default function ReportTable({ reports }) {
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
            <TableCell>{report.author.name}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
