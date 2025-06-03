import DashboardPage from "./pages/admin/DashboardPage";
import NarrativePage from "./pages/admin/NarrativePage";
import ProfilePage from "./pages/admin/ProfilePage";
import UserPage from "./pages/admin/UserPage";
import ReportPage from "./pages/admin/reports";
import LoginPage from "./pages/auth/LoginPage";
import AdminLayout from "./layouts/admin/AdminLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginAction } from "./pages/auth/LoginPage";
import { store } from "./store";
import PrivateRoute from "./components/PrivateRoute";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import LandingPage from "./pages/public/LandingPage";
import PublicLayout from "./layouts/public/PublicLayout";
import DetailReportPage from "./pages/admin/reports/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "narrative", element: <NarrativePage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "user", element: <UserPage /> },
          {
            path: "report",
            children: [
              { index: true, element: <ReportPage /> },
              { path: ":id", element: <DetailReportPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <RedirectIfLoggedIn />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        action: LoginAction(store),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
