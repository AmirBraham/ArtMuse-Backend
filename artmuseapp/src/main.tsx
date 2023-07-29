import React from "react";
import ReactDOM from "react-dom/client";
import '@fontsource-variable/jost';

import "./styles.css";
import Root from "./routes/root";
import Settings from "./routes/settings";
import Favorites from "./routes/favorites";
import ErrorPage from "./error-page";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    errorElement: <ErrorPage />,
  },
  {
    path:"/settings",
    element:<Settings/>
  },
  {
    path:"/favorites",
    element:<Favorites/>
  }
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
