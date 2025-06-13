import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function HeroSection() {
  // Animasi variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center"
            variants={imageVariants}
          >
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full max-w-xl">
              <motion.img
                src="/illustrations/online-article.svg"
                alt="Ilustrasi Pelaporan"
                className="object-contain w-full h-full drop-shadow-lg"
                animate={floatingAnimation}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />

              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-green-500 rounded-full opacity-15"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.4, 0.15],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="order-2 lg:order-1 flex flex-col justify-center space-y-6 text-center lg:text-left"
            variants={textVariants}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                variants={textVariants}
                whileInView={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                Sistem Pendataan Laporan dan Dokumentasi
              </motion.h1>

              <motion.p
                className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground text-base sm:text-lg md:text-xl"
                variants={textVariants}
                whileInView={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                SPLD adalah platform modernisasi untuk pendataan laporan dari
                Polsek ke Humas Polres Magelang, serta publikasi narasi kegiatan
                secara tertata dan efisien.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-start"
              variants={buttonVariants}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button asChild className="relative overflow-hidden">
                  <Link to="/login">
                    <motion.span
                      className="relative z-10"
                      whileHover={{
                        textShadow: "0 0 8px rgba(255,255,255,0.8)",
                      }}
                    >
                      Masuk Sebagai Petugas
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="outline"
                  asChild
                  className="relative overflow-hidden"
                >
                  <Link to="/narrative">
                    <motion.span
                      className="relative z-10"
                      whileHover={{
                        color: "#3b82f6",
                      }}
                    >
                      Lihat Narasi Publik
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-blue-50"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-30"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.8,
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-3 h-3 bg-purple-400 rounded-full opacity-25"
        animate={{
          y: [0, 15, 0],
          x: [0, 5, 0],
          opacity: [0.25, 0.6, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1.5,
        }}
      />
    </section>
  );
}
