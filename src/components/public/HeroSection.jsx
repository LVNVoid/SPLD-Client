import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Gambar di atas untuk mobile */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full max-w-xl">
              <img
                src="/illustrations/online-article.svg"
                alt="Ilustrasi Pelaporan"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Teks utama */}
          <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Sistem Pendataan Laporan dan Dokumentasi
              </h1>
              <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground text-base sm:text-lg md:text-xl">
                SPLD adalah platform modernisasi untuk pendataan laporan dari
                Polsek ke Humas Polres Magelang, serta publikasi narasi kegiatan
                secara tertata dan efisien.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-start">
              <Button asChild>
                <Link to="/login">Masuk Sebagai Petugas</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/narrative">Lihat Narasi Publik</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
