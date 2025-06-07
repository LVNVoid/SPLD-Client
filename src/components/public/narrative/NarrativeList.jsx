import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";

export function NarrativeList({ narrative }) {
  return (
    <Card className="w-full bg-background relative overflow-hidden rounded-sm p-4">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-2/5 lg:w-1/3 overflow-hidden">
          <div className="absolute inset-0" />
          <img
            src={narrative.imageUrl || "/placeholder.svg"}
            alt={narrative.title}
            className="w-[600px] h-[250px] object-fill rounded-sm"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
          <div className="space-y-3">
            <CardHeader className="p-0">
              <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {narrative.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-3 text-sm md:text-base">
                {narrative.description}
              </p>
            </CardContent>
          </div>

          <div className="mt-4 md:mt-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm ">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 md:w-7 md:h-7 ring-1">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {narrative.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="font-medium">{narrative.author}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 ml-8 sm:ml-0">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(narrative.date), "dd MMM yyyy")}</span>
              </div>

              <Link to={`/narrative/${narrative.id}`} className="block">
                <div className="flex items-center justify-end">
                  <span className="text-primary font-medium text-sm">
                    Baca Selengkapnya
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary " />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
