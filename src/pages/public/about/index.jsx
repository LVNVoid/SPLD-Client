import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PublicAboutPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary"
        >
          Tentang Kami
        </motion.h1>

        <motion.p
          variants={item}
          className="text-muted-foreground mb-6 md:mb-8 text-base sm:text-lg leading-relaxed"
        >
          Sistem Pendataan Laporan dan Dokumentasi (SPLD) adalah platform
          digital yang dibangun untuk meningkatkan efisiensi komunikasi dan
          pelaporan dari Polsek ke Humas Polres Magelang. Kami berkomitmen
          menyediakan sistem yang modern, aman, dan mudah digunakan bagi para
          petugas.
        </motion.p>

        <motion.div variants={item}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 flex items-center">
            <span className="w-2 h-5 sm:h-6 bg-primary mr-2 rounded-full"></span>
            Visi
          </h2>
          <motion.p
            className="mb-6 md:mb-8 pl-4 border-l-2 border-primary/20 text-base sm:text-lg"
            whileHover={{ x: 5 }}
          >
            Menjadi platform terpercaya untuk manajemen pelaporan kepolisian
            yang transparan, akurat, dan efisien.
          </motion.p>
        </motion.div>

        <motion.div variants={item}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 flex items-center">
            <span className="w-2 h-5 sm:h-6 bg-primary mr-2 rounded-full"></span>
            Misi
          </h2>
          <motion.ul
            className="list-disc pl-6 sm:pl-8 space-y-2 sm:space-y-3 text-base sm:text-lg"
            variants={container}
          >
            <motion.li
              variants={item}
              whileHover={{ x: 5 }}
              className="transition-colors hover:text-primary"
            >
              Menyederhanakan proses dokumentasi dan pelaporan.
            </motion.li>
            <motion.li
              variants={item}
              whileHover={{ x: 5 }}
              className="transition-colors hover:text-primary"
            >
              Mendukung publikasi narasi kegiatan secara terstruktur.
            </motion.li>
            <motion.li
              variants={item}
              whileHover={{ x: 5 }}
              className="transition-colors hover:text-primary"
            >
              Meningkatkan transparansi informasi ke publik.
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
