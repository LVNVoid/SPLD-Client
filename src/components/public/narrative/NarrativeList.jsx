import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

export function NarrativeList({ narrative }) {
  return (
    <Card className="w-full bg-background relative overflow-hidden rounded-sm p-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative md:w-2/5 lg:w-1/3 overflow-hidden">
          <div className="absolute inset-0" />
          <img
            src={narrative.imageUrl || "/placeholder.svg"}
            alt={narrative.title}
            className="w-full h-48 md:h-60 object-cover rounded-sm hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
          <div className="space-y-3">
            <CardHeader className="p-0">
              <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-primary leading-tight line-clamp-2 hover:text-primary/90 transition-colors">
                {narrative.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div
                className="text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3 text-sm md:text-base"
                dangerouslySetInnerHTML={{
                  __html: narrative.description,
                }}
              />
            </CardContent>
          </div>

          <div className="mt-4 md:mt-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 md:w-7 md:h-7 hover:scale-105 transition-transform">
                  <AvatarFallback className="text-xs font-semibold">
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
                <span>{formatDate(new Date(narrative.date))}</span>
              </div>

              <Link
                to={`/narrative/${narrative.id}`}
                className="block sm:ml-auto"
              >
                <motion.div
                  className="flex items-center justify-end gap-1 group"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-primary font-medium text-sm group-hover:underline">
                    Baca Selengkapnya
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
