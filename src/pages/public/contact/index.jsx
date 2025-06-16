import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Schema validasi
const formSchema = z.object({
  name: z.string().min(2, "Nama terlalu pendek"),
  email: z.string().email("Email tidak valid"),
  message: z.string().min(10, "Pesan terlalu pendek"),
});

export default function PublicContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    toast.success("Pesan berhasil dikirim");
    reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-primary">
            Kontak Kami
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Jika Anda memiliki pertanyaan, saran, atau memerlukan bantuan,
            silakan hubungi kami melalui formulir di bawah ini.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6 bg-background p-4 sm:p-6 rounded-lg border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="name"
              className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base"
            >
              Nama
            </label>
            <Input
              id="name"
              placeholder="Nama lengkap Anda"
              {...register("name")}
              className={`text-sm sm:text-base ${
                errors.name ? "border-destructive" : ""
              }`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-xs sm:text-sm mt-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label
              htmlFor="email"
              className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="email@contoh.com"
              {...register("email")}
              className={`text-sm sm:text-base ${
                errors.email ? "border-destructive" : ""
              }`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-xs sm:text-sm mt-1"
              >
                {errors.email.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="message"
              className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base"
            >
              Pesan
            </label>
            <Textarea
              id="message"
              placeholder="Tulis pesan Anda..."
              rows={4}
              className={`text-sm sm:text-base ${
                errors.message ? "border-destructive" : ""
              }`}
              {...register("message")}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-xs sm:text-sm mt-1"
              >
                {errors.message.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-2"
          >
            <Button
              type="submit"
              className="w-full sm:w-auto text-sm sm:text-base"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Pesan"
              )}
            </Button>
          </motion.div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-10 p-4 sm:p-6 bg-background border rounded-md shadow-sm"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
            Kontak Langsung
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-1 sm:mb-2">
            Email: humas@polresmagelang.id
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Telepon: (0293) 1234567
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
