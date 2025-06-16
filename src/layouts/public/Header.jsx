import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { Moon, Sun } from "lucide-react";

const Header = ({ theme, setTheme, isMounted }) => {
  const location = useLocation();

  const navItems = [
    { name: "Beranda", to: "/" },
    { name: "Narasi", to: "/narrative" },
    { name: "Tentang Kami", to: "/about-us" },
    { name: "Kontak", to: "/contact" },
  ];

  return (
    <header className="border-b">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <img
              src="logo-light.png"
              alt="SPLD Logo Light"
              className="block dark:hidden h-15"
            />
            <img
              src="logo-dark.png"
              alt="SPLD Logo Dark"
              className="hidden dark:block h-15"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
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
            <Link to="/login">Masuk</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
