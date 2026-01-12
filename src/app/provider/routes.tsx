import { DetailPage } from "@/pages/detail/DetailPage";
import { HomePage } from "@/pages/home/HomePage";
import { SearchPage } from "@/pages/search/SearchPage";
import { PageLayout } from "@/shared";
import { BottomNavigation } from "@/shared/ui/BottomNavigation";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

const Layout = () => {
  return (
    <PageLayout>
      <Outlet />
      <BottomNavigation />
    </PageLayout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/search",
        Component: SearchPage,
      },
      {
        path: "/detail/:locationId",
        Component: DetailPage,
      },
    ],
  },
]);

export const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};
