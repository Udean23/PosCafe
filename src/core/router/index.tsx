import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/views/layouts/MainLayout";
import { Dashboard, Kasir,OrderList } from "@/views/pages/Pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "kasir",
        element: <Kasir />,
      },
      {
        path: "order-list",
        element: <OrderList />,
      }
    ],
  },
]);
