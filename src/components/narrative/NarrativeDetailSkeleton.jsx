import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function NarrativeDetailSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 space-y-8"
    >
      {/* Title and Metadata */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4 sm:w-1/2" />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24 sm:w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20 sm:w-28" />
          </div>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="relative w-full h-64 sm:h-80 md:h-[500px] overflow-hidden rounded-sm">
        <Skeleton className="absolute w-full h-full" />
      </div>

      {/* Content Placeholder */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </motion.div>
  );
}
