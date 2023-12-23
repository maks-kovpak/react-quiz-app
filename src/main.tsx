import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, ThemeConfig } from "antd";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./pages/main";
import Question from "./pages/question";
import "@/assets/styles/index.less";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/question",
        element: <Question />
      }
    ]
  }
]);

const config: ThemeConfig = {
  token: {
    fontFamily: "'General Sans', sans-serif",
    colorPrimary: "#31CD63",
    colorBgBase: "#F4F3F6"
  },
  components: {
    Progress: {
      defaultColor: "#31CD63"
    }
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={config} componentSize="large">
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
