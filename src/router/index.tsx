import {
  createBrowserRouter,
  redirect,
  type RouteObject,
} from "react-router-dom";

import { lazy } from "react";

const App = lazy(() => import("../App"));
const Login = lazy(() => import("../views/login"));
const HomePage = lazy(() => import("../views/home"));
const Counter = lazy(() => import("../views/counter"));
const AboutUs = lazy(() => import("../views/aboutUs"));

export const route: RouteObject[] = [
  {
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        handle: { label: "Home" },
        element: <HomePage />,
      },
      {
        path: "/about-us",
        handle: { label: "About Us" },
        element: <AboutUs />,
      },
      {
        path: "/counter",
        handle: { label: "Counter" },
        element: <Counter />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      const token = localStorage.token;
      if (token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },
];

export default createBrowserRouter(route);
