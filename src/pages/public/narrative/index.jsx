import React, { useState, useMemo } from "react";
import useCrud from "@/hooks/useCrud";
import { NarrativeList } from "@/components/public/narrative/NarrativeList";
import { FilterToolbar } from "@/components/public/narrative/FilterToolbar";
import { Pagination } from "@/components/public/narrative/Pagination";

const ITEMS_PER_PAGE = 5;

export default function PublicNarrativesPage() {
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: apiData,
    loading,
    error,
  } = useCrud("/narratives/public", { autoFetch: true });

  const allNarratives = useMemo(() => {
    if (!Array.isArray(apiData) || apiData.length === 0) return [];

    return apiData.map((narrative) => ({
      id: narrative.id,
      title: narrative.title,
      imageUrl:
        narrative.images?.[0]?.url ||
        "https://via.placeholder.com/600x400?text=No+Image",
      description: narrative.content,
      author: narrative.author?.name || "Unknown Author",
      date: narrative.publishedAt,
    }));
  }, [apiData]);

  console.count("Rendering apiData:");
  console.log("Current data:", apiData);

  const authors = useMemo(() => {
    const unique = [...new Set(allNarratives.map((n) => n.author))];
    return unique;
  }, [allNarratives]);

  const filteredNarratives = useMemo(() => {
    return allNarratives.filter((n) => {
      const matchSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase());
      const matchAuthor =
        authorFilter === "all" ? true : n.author === authorFilter;
      return matchSearch && matchAuthor;
    });
  }, [search, authorFilter, allNarratives]);

  const totalPages = Math.ceil(filteredNarratives.length / ITEMS_PER_PAGE);
  const paginatedNarratives = filteredNarratives.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => setCurrentPage((p) => p - 1);
  const handleNextPage = () => setCurrentPage((p) => p + 1);
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleAuthorFilterChange = (value) => {
    setAuthorFilter(value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="w-full p-4 md:p-6">Memuat data...</div>;
  }

  if (error) {
    return (
      <div className="w-full p-4 md:p-6 text-red-500">
        Gagal memuat data: {error}
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold px-2">Daftar Narasi</h1>

      <FilterToolbar
        search={search}
        onSearchChange={handleSearchChange}
        authorFilter={authorFilter}
        onAuthorFilterChange={handleAuthorFilterChange}
        authors={authors}
      />

      {paginatedNarratives.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Tidak ada narasi yang ditemukan
        </div>
      ) : (
        paginatedNarratives.map((narrative) => (
          <NarrativeList key={narrative.id} narrative={narrative} />
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </div>
  );
}
