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
import PublicDetailNarrativePage from "./pages/public/narrative/detail";
import DetailNarrativePage from "./pages/admin/narrative/detail";
import EditNarrativePage from "./pages/admin/narrative/edit";
import DetailUserPage from "./pages/admin/user/detail";
import Unauthorized from "./pages/error/Unauthorized";

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
        children: [
          {
            index: true,
            element: <PublicNarrativePage />,
          },
          {
            path: ":id",
            element: <PublicDetailNarrativePage />,
          },
        ],
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
                path: ":id",
                element: <DetailNarrativePage />,
              },
              {
                element: <PrivateRoute allowedRoles={["ADMIN", "HUMAS"]} />,
                children: [
                  {
                    path: "add/:id",
                    element: <CreateNarrativePage />,
                  },
                  {
                    path: "edit/:id",
                    element: <EditNarrativePage />,
                  },
                ],
              },
            ],
          },
          { path: "profile", element: <ProfilePage /> },
          {
            element: <PrivateRoute allowedRoles={["ADMIN"]} />,
            children: [
              { path: "polsek", element: <PolsekPage /> },
              {
                path: "user",
                children: [
                  { index: true, element: <UserPage /> },
                  { path: ":id", element: <DetailUserPage /> },
                ],
              },
            ],
          },
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
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
