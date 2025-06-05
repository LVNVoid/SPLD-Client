import DashboardPage from "./pages/admin/dashboard";
import NarrativePage from "./pages/admin/narrative";
import ProfilePage from "./pages/admin/profile";
import UserPage from "./pages/admin/user";
import ReportPage from "./pages/admin/report";
import LoginPage from "./pages/auth/login";
import AdminLayout from "./layouts/admin/AdminLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginAction } from "./pages/auth/login";
import { store } from "./store";
import PrivateRoute from "./components/PrivateRoute";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import PublicHomePage from "./pages/public/home";
import PublicLayout from "./layouts/public/PublicLayout";
import DetailReportPage from "./pages/admin/report/detail";
import CreateNarrativePage from "./pages/admin/narrative/add";
import PolsekPage from "./pages/admin/polsek";
import PublicNarrativePage from "./pages/public/narrative";
import PublicContactPage from "./pages/public/contact";
import PublicAboutPage from "./pages/public/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <PublicHomePage />,
      },
      {
        path: "narrative",
        element: <PublicNarrativePage />,
      },
      {
        path: "contact",
        element: <PublicContactPage />,
      },
      {
        path: "about-us",
        element: <PublicAboutPage />,
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
          {
            path: "narrative",
            children: [
              {
                index: true,
                element: <NarrativePage />,
              },
              {
                path: "add/:id",
                element: <CreateNarrativePage />,
              },
            ],
          },
          { path: "profile", element: <ProfilePage /> },
          { path: "polsek", element: <PolsekPage /> },
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
