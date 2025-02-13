"use client";
import { useSelector } from "react-redux";
import AuthForm from "@/components/authentication/AuthForm";

export default function AuthpageClient() {
  const token = useSelector((state) => state.auth?.user?.token);

  //TODO: Redirect to home page if user is already logged in
  return <AuthForm />;
}
