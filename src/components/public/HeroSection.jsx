import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          {/* Teks utama */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Sistem Pendataan Laporan dan Dokumentasi
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                SPLD adalah platform modernisasi untuk pendataan laporan dari
                Polsek ke Humas Polres Magelang, serta publikasi narasi kegiatan
                secara tertata dan efisien.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link to="/login">Masuk Sebagai Petugas</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/narasi">Lihat Narasi Publik</Link>
              </Button>
            </div>
          </div>

          {/* Gambar */}
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <img
                src="/illustrations/online-article.svg" // Ganti dengan ilustrasi yang relevan
                alt="Ilustrasi Pelaporan"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
