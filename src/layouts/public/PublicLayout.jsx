import { Outlet } from "react-router-dom";
import Header from "./Header";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col container mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
