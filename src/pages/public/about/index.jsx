export default function PublicAboutPage() {
  return (
    <section className="container w-full py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
      <p className="text-muted-foreground mb-6">
        Sistem Pendataan Laporan dan Dokumentasi (SPLD) adalah platform digital
        yang dibangun untuk meningkatkan efisiensi komunikasi dan pelaporan dari
        Polsek ke Humas Polres Magelang. Kami berkomitmen menyediakan sistem
        yang modern, aman, dan mudah digunakan bagi para petugas.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Visi</h2>
      <p className="mb-6">
        Menjadi platform terpercaya untuk manajemen pelaporan kepolisian yang
        transparan, akurat, dan efisien.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Misi</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Menyederhanakan proses dokumentasi dan pelaporan.</li>
        <li>Mendukung publikasi narasi kegiatan secara terstruktur.</li>
        <li>Meningkatkan transparansi informasi ke publik.</li>
      </ul>
    </section>
  );
}
