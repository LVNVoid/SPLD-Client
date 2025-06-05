import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ theme, setTheme, isMounted }) => {
  return (
    <header className="border-b">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            SPLD
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Beranda
          </Link>
          <Link
            to="/narrative"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Narasi
          </Link>
          <Link
            to="/about-us"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Tentang Kami
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Kontak
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isMounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Button asChild className="hidden md:inline-flex">
            <Link to={"/login"}>Masuk </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
