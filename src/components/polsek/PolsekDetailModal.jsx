import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Users,
  Calendar,
  Clock,
  Building2,
  AlertCircle,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import useCrud from "@/hooks/useCrud";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function PolsekDetailModal({ id, onClose }) {
  const [isOpen, setIsOpen] = useState(!!id);
  const [detail, setDetail] = useState(null);

  const { getData, detailLoading, error } = useCrud("/polseks", {
    autoFetch: false,
  });

  useEffect(() => {
    setIsOpen(!!id);
    if (id) {
      getData(id)
        .then((data) => setDetail(data))
        .catch(() => setDetail(null));
    }
  }, [id, getData]);

  const handleClose = () => {
    setIsOpen(false);
    setDetail(null);
    onClose?.();
  };
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5 text-primary" />
            Detail Polsek
          </DialogTitle>
        </DialogHeader>

        {detailLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Memuat data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 text-destructive">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="bg-muted/30 shadow-none">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{detail?.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                      <Users className="h-4 w-4" />
                      <span>{detail?._count?.users || 0} Pengguna</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Daftar Pengguna
                </h4>
                <Badge variant="outline">
                  {detail?.users?.length || 0} Pengguna
                </Badge>
              </div>

              <Separator />

              <div className="max-h-[200px] overflow-y-auto pr-1">
                {detail?.users?.length > 0 ? (
                  <div className="space-y-3">
                    {detail.users.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                    <User className="h-8 w-8 mb-2 opacity-40" />
                    <p className="text-sm">Tidak ada pengguna</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-2">
          <Button onClick={handleClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
