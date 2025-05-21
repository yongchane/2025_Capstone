import React, { lazy, Suspense } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Loading from "../components/Loading";

const Main = lazy(
  () => import("../page/main") as Promise<{ default: React.ComponentType }>
);
const Login = lazy(
  () => import("../page/login") as Promise<{ default: React.ComponentType }>
);
const Place = lazy(
  () => import("../page/place") as Promise<{ default: React.ComponentType }>
);
const Search = lazy(
  () => import("../page/search") as Promise<{ default: React.ComponentType }>
);
// const Record = lazy(() => import("../page/record") as Promise<{ default: React.ComponentType }>);
// const Statistic = lazy(() => import("../page/statistic") as Promise<{ default: React.ComponentType }>);
import Layout from "../layout/Layout";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "Login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "Place",
        element: (
          <Suspense fallback={<Loading />}>
            <Place />
          </Suspense>
        ),
      },
      {
        path: "Search",
        element: (
          <Suspense fallback={<Loading />}>
            <Search />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
