import { StrictMode } from "react";
import { children } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {

  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import TopRated from "./pages/topRated/TopRated.jsx";
import Upcoming from "./pages/upcoming/Upcoming.jsx";
import Error from "./pages/error/Error.jsx";
import SearchResults from "./components/search/SearchResults.jsx";
import MoviesDetail from "./pages/moviesdetatil/MoviesDetail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <MoviesDetail />,
      },
      {
        path: "/top-rated",
        element: <TopRated />,
      },
      {
        path: "/top-rated/:id",
        element: <MoviesDetail />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/upcoming/:id",
        element: <MoviesDetail />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
