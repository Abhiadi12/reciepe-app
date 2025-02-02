import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/authentication/AuthForm";

function AuthPage() {
  const token = useSelector((state) => state.auth?.user?.token);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <AuthForm />
    </div>
  );
}

export default AuthPage;
