import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "@/lib/axios"; // Sesuaikan dengan path Anda
import Spinner from "./ui/spinner";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.userState);
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await api.get("/auth/validate", {
          withCredentials: true,
        });
        setIsValidSession(response.data.success);
      } catch (error) {
        console.error("Session validation failed:", error);
        setIsValidSession(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();
  }, []);

  if (isValidating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>
          <Spinner className="animate-spin" size={20} />
          Memverifikasi sesi...
        </p>
      </div>
    );
  }

  if (!isValidSession) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Memuat data pengguna...</p>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
