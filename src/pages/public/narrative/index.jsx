import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCrud from "@/hooks/useCrud";
import { NarrativeList } from "@/components/public/narrative/NarrativeList";
import { Pagination } from "@/components/public/narrative/Pagination";
import { FilterToolbar } from "@/components/FIlterToolbar";
import { NarrativeSkeleton } from "@/components/public/narrative/NarrativeListSkeleton";

const ITEMS_PER_PAGE = 5;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function PublicNarrativesPage() {
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");

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

  const authors = useMemo(() => {
    const unique = [...new Set(allNarratives.map((n) => n.author))];
    return unique;
  }, [allNarratives]);

  const filteredNarratives = useMemo(() => {
    let result = allNarratives.filter((n) => {
      const matchSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase());

      const matchAuthor =
        authorFilter === "all" ? true : n.author === authorFilter;

      return matchSearch && matchAuthor;
    });

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [search, authorFilter, sortOrder, allNarratives]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 md:p-6 space-y-6"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold px-2"
      >
        Narasi Publik
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <FilterToolbar
          search={search}
          onSearchChange={handleSearchChange}
          authorFilter={authorFilter}
          onAuthorFilterChange={handleAuthorFilterChange}
          authors={authors}
          sortOrder={sortOrder}
          onSortOrderChange={(value) => {
            setSortOrder(value);
            setCurrentPage(1);
          }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <div className="space-y-6">
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <NarrativeSkeleton key={i} />
            ))}
          </div>
        ) : paginatedNarratives.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={pageTransition}
            className="text-center py-8 text-muted-foreground"
          >
            Tidak ada narasi yang ditemukan
          </motion.div>
        ) : (
          <motion.div
            key="narratives-list"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <AnimatePresence>
              {paginatedNarratives.map((narrative) => (
                <motion.div
                  key={narrative.id}
                  layout
                  variants={itemVariants}
                  transition={pageTransition}
                >
                  <NarrativeList narrative={narrative} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      </motion.div>
    </motion.div>
  );
}
