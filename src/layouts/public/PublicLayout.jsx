import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const PublicLayout = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="min-h-screen flex flex-col container mx-auto">
      <Header theme={theme} setTheme={setTheme} isMounted={isMounted} />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
