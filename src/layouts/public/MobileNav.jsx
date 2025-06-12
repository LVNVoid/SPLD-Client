import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Beranda", to: "/" },
    { name: "Narasi", to: "/narrative" },
    { name: "Tentang Kami", to: "/about-us" },
    { name: "Kontak", to: "/contact" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] sm:w-[320px] p-6 flex flex-col justify-between"
      >
        <nav className="space-y-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`block text-lg font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                location.pathname === item.to
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <Button className="w-full" asChild>
            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
