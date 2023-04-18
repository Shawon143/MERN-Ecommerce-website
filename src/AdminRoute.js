import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
// import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { admin } = useAuth();

  return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
