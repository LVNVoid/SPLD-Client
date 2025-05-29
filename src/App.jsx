import DashboardPage from "./pages/DashboardPage";
import NarrativePage from "./pages/NarrativePage";
import ProfilePage from "./pages/ProfilePage";
import UserPage from "./pages/UserPage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/auth/LoginPage";
import AdminLayout from "./layouts/admin/AdminLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginAction } from "./pages/auth/LoginPage";
import { store } from "./store";
import PrivateRoute from "./components/PrivateRoute";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";

const router = createBrowserRouter([
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
          { path: "report", element: <ReportPage /> },
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
