import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PopUpInformation = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Selamat Datang di SPLD</DialogTitle>
          <DialogDescription>
            Sistem Pendataan Laporan dan Dokumentasi (SPLD) digunakan oleh Humas
            Polres Magelang untuk menerima laporan dari Polsek dan membuat
            narasi dokumentasi.
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Disclaimer:</strong> Semua data yang ditampilkan di website
            ini adalah{" "}
            <span className="text-foreground font-medium">data dummy</span> atau{" "}
            <span className="text-foreground font-medium">data contoh</span>.
            Nama, kejadian, dan foto hanya digunakan untuk keperluan
            demonstrasi.
          </p>
          <p>Anda dapat mencoba fitur website ini dengan akun berikut:</p>

          <div className="space-y-2 mt-3">
            <div>
              <Badge variant="outline" className="mb-1">
                Admin
              </Badge>
              <div className="ml-2">
                <p>
                  Email: <code>admin@polda.jateng.go.id</code>
                </p>
                <p>
                  Password: <code>password123</code>
                </p>
              </div>
            </div>
            <div>
              <Badge variant="outline" className="mb-1">
                Humas
              </Badge>
              <div className="ml-2">
                <p>
                  Email: <code>humas@polda.jateng.go.id</code>
                </p>
                <p>
                  Password: <code>password123</code>
                </p>
              </div>
            </div>
            <div>
              <Badge variant="outline" className="mb-1">
                Polsek
              </Badge>
              <div className="ml-2">
                <p>
                  Email: <code>polsek@polda.jateng.go.id</code>
                </p>
                <p>
                  Password: <code>password123</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpInformation;
