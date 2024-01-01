import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, ThemeConfig } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./pages/main";
import Question from "./pages/question";
import "@/assets/styles/index.less";

import vars from "./variables";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/question", element: <Question /> }
]);

const config: ThemeConfig = {
  token: {
    fontFamily: vars.mainFont,
    colorPrimary: vars.primaryColor,
    colorBgBase: vars.lightBgColor
  },
  components: {
    Progress: {
      defaultColor: vars.primaryColor,
      colorText: vars.secondaryTextColor,
      fontSize: 16
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
