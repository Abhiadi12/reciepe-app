"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AuthForm from "@/components/authentication/AuthForm";
import RedirectLoader from "../shimmer/RedirectLoader";

export default function AuthpageClient() {
  const token = useSelector((state) => state.auth?.user?.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/home");
    }
  }, [token, router]);
  if (token) return <RedirectLoader />;

  return <AuthForm />;
}
