import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// styles
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/empdash.css";


// toast
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
    />
    <App />
  </>
);
