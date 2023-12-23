import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, ThemeConfig } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Main from "./pages/Main.tsx";
import Question from "./pages/Question.tsx";
import "@/assets/styles/index.less";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={config} componentSize="large">
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
