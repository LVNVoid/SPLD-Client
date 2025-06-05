import { Link } from "react-router-dom";
import { Bell, Menu, Moon, Search, Shield, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

export function TopNavbar({
  user,
  navigationItems,
  isActive,
  theme,
  setTheme,
  isMounted,
  handleLogout,
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm h-16">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <MobileMenu
              user={user}
              navigationItems={navigationItems}
              isActive={isActive}
            />
          </Sheet>

          {/* Desktop Logo */}
          <Link to="/admin" className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full  flex items-center justify-center">
              <span className="text-primary font-bold">
                <Shield className="h-6 w-6 text-primary" />
              </span>
            </div>
            <span className="font-bold text-xl">SPLD</span>
          </Link>
        </div>

        {/* Navbar Right Items */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
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

          <NavDropdown user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
