import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, ThemeConfig } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./pages/main";
import Question from "./pages/question";
import "@/assets/styles/index.less";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/question", element: <Question /> }
]);

const vars = {
  // Colors
  mainBgColor: "#ede8e3",
  lightBgColor: "#f4f3f6",
  primaryColor: "#31cd63",

  // Fonts
  mainFont: "'General Sans', sans-serif",
  primaryTextColor: "#060710",
  secondaryTextColor: "#757575",
  titlesTextColor: "#191d63"
} as const;

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
