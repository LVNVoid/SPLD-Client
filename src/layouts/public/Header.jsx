import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="border-b">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            SPLD
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Narasi
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Tentang Kami
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Kontak
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/login">Masuk </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
