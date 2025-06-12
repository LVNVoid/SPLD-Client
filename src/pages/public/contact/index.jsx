import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PublicContactPage() {
  return (
    <section className="container w-full py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-4">Kontak</h1>
      <p className="text-muted-foreground mb-6">
        Jika Anda memiliki pertanyaan, saran, atau memerlukan bantuan, silakan
        hubungi kami melalui formulir di bawah ini.
      </p>

      <form className="space-y-4 max-w-xl">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Nama
          </label>
          <Input id="name" placeholder="Nama lengkap Anda" required />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@contoh.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Pesan
          </label>
          <Textarea
            id="message"
            placeholder="Tulis pesan Anda..."
            rows={5}
            required
          />
        </div>

        <Button type="submit" className="mt-2">
          Kirim Pesan
        </Button>
      </form>
    </section>
  );
}
