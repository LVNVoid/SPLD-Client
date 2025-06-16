import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { login, logout } from "@/features/userSlice";
import api from "@/lib/axios";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        dispatch(login(data.user));
      } catch (err) {
        dispatch(logout());
      } finally {
        setCheckingAuth(false);
      }
    };

    if (!user) {
      checkAuth();
    } else {
      setCheckingAuth(false);
    }
  }, [user, dispatch]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
