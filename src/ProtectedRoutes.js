import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./Components/Navbar";

export const ProtectedRoutes = () => {
  const token = localStorage.getItem("token") ? true : false;
  return token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={{ pathname: "/" }} />
  );
};
