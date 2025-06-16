import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import StatsCardSkeleton from "./StatsCardSkeleton";

const StatsCard = ({ stats, isLoading = false, error }) => {
  if (isLoading) {
    return <StatsCardSkeleton />;
  }

  if (error) <p className="text-destructive">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <Card
          className="bg-background hover:shadow-md transition-shadow"
          key={i}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <div className="h-6 w-6 text-muted-foreground">{stat.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;
