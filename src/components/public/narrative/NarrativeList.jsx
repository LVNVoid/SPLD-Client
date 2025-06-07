import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function NarrativeList({ narrative }) {
  return (
    <Card
      key={narrative.id}
      className="w-full overflow-hidden shadow-md transition hover:shadow-lg rounded-2xl"
    >
      <div className="flex flex-col md:flex-row">
        <img
          src={narrative.imageUrl}
          alt={narrative.title}
          className="w-full md:w-1/3 h-60 md:h-auto object-cover"
        />
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl font-semibold text-primary">
                {narrative.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 text-sm text-muted-foreground">
              <p className="line-clamp-3">{narrative.description}</p>
            </CardContent>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Avatar className="w-7 h-7">
                <AvatarFallback>
                  {narrative.author.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{narrative.author}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">
                {format(new Date(narrative.date), "dd MMM yyyy")}
              </span>
            </div>

            {/* Opsional: tambahkan status narasi */}
            {narrative.status && (
              <Badge
                variant={
                  narrative.status === "approved"
                    ? "success"
                    : narrative.status === "pending"
                    ? "warning"
                    : "destructive"
                }
                className="w-fit"
              >
                {narrative.status.charAt(0).toUpperCase() +
                  narrative.status.slice(1)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
