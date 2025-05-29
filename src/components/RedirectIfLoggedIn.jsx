import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfLoggedIn = () => {
  const { user } = useSelector((state) => state.userState);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default RedirectIfLoggedIn;
