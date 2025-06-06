import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Dummy data
const allNarratives = [
  {
    id: 1,
    title: "Kegiatan Baksos di Desa Sukamaju",
    imageUrl: "https://source.unsplash.com/800x600/?community",
    description:
      "Kegiatan bakti sosial oleh anggota Polsek Sukamaju dalam rangka HUT Bhayangkara.",
    author: "Aiptu Budi",
    date: "2025-06-01",
  },
  {
    id: 2,
    title: "Patroli Malam Gabungan",
    imageUrl: "https://source.unsplash.com/800x600/?patrol",
    description:
      "Patroli gabungan untuk menjaga kondusivitas wilayah hukum Polres.",
    author: "Bripka Sari",
    date: "2025-06-03",
  },
  {
    id: 3,
    title: "Penyuluhan Narkoba di Sekolah",
    imageUrl: "https://source.unsplash.com/800x600/?education",
    description: "Edukasi tentang bahaya narkoba untuk pelajar SMA Negeri 2.",
    author: "Ipda Rian",
    date: "2025-06-04",
  },
  {
    id: 4,
    title: "Operasi Zebra 2025",
    imageUrl: "https://source.unsplash.com/800x600/?traffic",
    description: "Rangkaian kegiatan operasi Zebra oleh satuan lalu lintas.",
    author: "Aiptu Budi",
    date: "2025-06-05",
  },
  {
    id: 5,
    title: "Gotong Royong Bersama Warga",
    imageUrl: "https://source.unsplash.com/800x600/?village",
    description: "Sinergi polisi dan warga dalam memperbaiki jembatan desa.",
    author: "Bripka Sari",
    date: "2025-06-05",
  },
  {
    id: 6,
    title: "Sosialisasi Tertib Berlalu Lintas",
    imageUrl: "https://source.unsplash.com/800x600/?law",
    description: "Kampanye tertib lalu lintas di pasar pagi Sukaraja.",
    author: "Ipda Rian",
    date: "2025-06-06",
  },
];

const ITEMS_PER_PAGE = 5;

export default function PublicNarrativesPage() {
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const authors = useMemo(() => {
    const unique = [...new Set(allNarratives.map((n) => n.author))];
    return unique;
  }, []);

  const filteredNarratives = useMemo(() => {
    return allNarratives.filter((n) => {
      const matchSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase());
      const matchAuthor =
        authorFilter === "all" ? true : n.author === authorFilter;
      return matchSearch && matchAuthor;
    });
  }, [search, authorFilter]);

  const totalPages = Math.ceil(filteredNarratives.length / ITEMS_PER_PAGE);
  const paginatedNarratives = filteredNarratives.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold px-2">Daftar Narasi</h1>

      {/* Toolbox */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        <Input
          placeholder="Cari narasi..."
          className="w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Select
          value={authorFilter}
          onValueChange={(val) => {
            setAuthorFilter(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-52">
            <SelectValue placeholder="Filter Penulis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Penulis</SelectItem>
            {authors.map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Narasi Cards */}
      {paginatedNarratives.map((narrative) => (
        <Card key={narrative.id} className="w-full overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <img
              src={narrative.imageUrl}
              alt={narrative.title}
              className="w-full md:w-1/3 h-56 md:h-auto object-cover"
            />
            <div className="flex-1">
              <CardHeader>
                <CardTitle>{narrative.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {narrative.description}
                </p>
                <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback>
                      {narrative.author.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{narrative.author}</span>
                  <span>•</span>
                  <span>
                    {format(new Date(narrative.date), "dd MMMM yyyy")}
                  </span>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Sebelumnya
          </Button>
          <span className="text-sm text-muted-foreground">
            Halaman {currentPage} dari {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Selanjutnya
          </Button>
        </div>
      )}
    </div>
  );
}
