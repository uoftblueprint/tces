import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import ViewJobPost from "./pages/view-job-post/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ViewJobPost />
  </React.StrictMode>,
);
