import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookText,
  FileText,
  Building,
  Users,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/userSlice";
import api from "@/lib/axios";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await api.post("auth/logout");
    dispatch(logout());
    navigate("/login");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Narasi",
      path: "/admin/narrative",
      icon: <BookText className="w-5 h-5" />,
    },
    {
      name: "Laporan",
      path: "/admin/report",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Data Polsek",
      path: "/admin/polsek",
      icon: <Building className="w-5 h-5" />,
    },
    {
      name: "Data Pengguna",
      path: "/admin/user",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path !== "/admin" && location.pathname.startsWith(path))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground w-full">
      <TopNavbar
        user={user}
        navigationItems={navigationItems}
        isActive={isActive}
        theme={theme}
        setTheme={setTheme}
        isMounted={isMounted}
        handleLogout={handleLogout}
      />
      <div className="flex flex-1">
        <Sidebar
          user={user}
          navigationItems={navigationItems}
          isActive={isActive}
          handleLogout={handleLogout}
        />
        <main className="flex-1 w-full md:ml-64 overflow-auto">
          <div className="p-4 md:p-6 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
