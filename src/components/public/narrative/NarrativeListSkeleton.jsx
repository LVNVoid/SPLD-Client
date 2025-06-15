import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NarrativeSkeleton() {
  return (
    <Card className="w-full bg-background rounded-sm p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="w-full md:w-1/3 h-48 md:h-60 rounded-sm" />

        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20 sm:ml-4" />
            <Skeleton className="h-4 w-32 sm:ml-auto" />
          </div>
        </div>
      </div>
    </Card>
  );
}
