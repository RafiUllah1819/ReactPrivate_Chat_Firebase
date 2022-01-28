import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { SignIn } from "./Auth/SignIn";
import { SignUp } from "./Auth/SignUp";
import { Home } from "./Components/Home";

export const Routs = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};
