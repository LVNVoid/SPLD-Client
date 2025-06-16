import { login } from "@/features/userSlice";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.userState.user);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        const fetchedUser = await verifyToken();
        if (fetchedUser) {
          dispatch(login(fetchedUser));
          setAuthUser(fetchedUser);
        }
      } else {
        setAuthUser(user);
      }
      setLoading(false);
    };

    checkAuth();
  }, [user, dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

async function verifyToken() {
  try {
    const res = await api.get("/auth/validate");

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch (err) {
    console.error(err);
    return null;
  }
}
