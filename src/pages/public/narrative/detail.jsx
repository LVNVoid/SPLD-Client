import { motion } from "framer-motion";
import NarrativeDetail from "@/components/narrative/NarrativeDetail";
import useCrud from "@/hooks/useCrud";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PublicDetailNarrativePage = () => {
  const { id: narrativeId } = useParams();
  const { getData, detailLoading, error } = useCrud("/narratives", {
    autoFetch: false,
  });

  const [narrative, setNarrative] = useState(null);

  useEffect(() => {
    if (narrativeId) {
      getData(narrativeId).then(setNarrative).catch(console.error);
    }
  }, [narrativeId, getData]);

  if (detailLoading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        Loading...
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-red-500"
      >
        Error: {error}
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          whileHover={{ x: -3 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link
            to="/narrative"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 " />
            <span className="text-sm md:text-md font-medium">
              Kembali ke Daftar Narasi
            </span>
          </Link>
        </motion.div>

        {narrative && <NarrativeDetail narrative={narrative} />}
      </div>
    </motion.div>
  );
};

export default PublicDetailNarrativePage;
