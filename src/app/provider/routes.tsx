import { useGetGeoLocation } from "@/features/geolocation";
import { DetailPage } from "@/pages/detail/DetailPage";
import { HomePage } from "@/pages/home/HomePage";
import { SearchPage } from "@/pages/search/SearchPage";
import { PageLayout } from "@/shared";
import { BottomNavigation } from "@/shared/ui/BottomNavigation";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { homeLoader, detailLoader } from "./loaders";

const Layout = () => {
  useGetGeoLocation();
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
        loader: homeLoader,
      },
      {
        path: "/search",
        Component: SearchPage,
      },
      {
        path: "/detail",
        Component: DetailPage,
        loader: detailLoader,
      },
    ],
  },
]);

export const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};
