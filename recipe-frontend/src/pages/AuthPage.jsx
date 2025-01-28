import React from "react";
import AuthForm from "../components/authentication/AuthForm";
import Header from "../components/header/Header";

function AuthPage() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <AuthForm />
      </div>
    </>
  );
}

export default AuthPage;
