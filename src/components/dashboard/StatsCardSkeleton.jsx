import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const StatsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <Card className="bg-background" key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-6 w-6 rounded-full" />{" "}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[80px] mt-2" />{" "}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCardSkeleton;
