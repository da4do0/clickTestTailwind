import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./routes/header";
import Main from "./routes/main/mainContainer";
import User from "./routes/user/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children:[{
      index: true,
      element: <Main/>
    },{
      path:"/user",
      element: <User/>
    }]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
