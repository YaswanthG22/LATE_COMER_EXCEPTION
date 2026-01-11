import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
