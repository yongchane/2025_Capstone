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

const Font = lazy(
  () =>
    import("../page/login/Font") as Promise<{ default: React.ComponentType }>
);
const Register = lazy(
  () =>
    import("../page/login/Register") as Promise<{
      default: React.ComponentType;
    }>
);

const Home = lazy(
  () =>
    import("../page/main/Home") as Promise<{
      default: React.ComponentType;
    }>
);
const Preference = lazy(
  () =>
    import("../page/search/Preference") as Promise<{
      default: React.ComponentType;
    }>
);
const Simple = lazy(
  () =>
    import("../page/search/Simple") as Promise<{
      default: React.ComponentType;
    }>
);

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
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "place",
        element: (
          <Suspense fallback={<Loading />}>
            <Place />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<Loading />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "font",
        element: (
          <Suspense fallback={<Loading />}>
            <Font />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "preference",
        element: (
          <Suspense fallback={<Loading />}>
            <Preference />
          </Suspense>
        ),
      },
      {
        path: "simple",
        element: (
          <Suspense fallback={<Loading />}>
            <Simple />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
