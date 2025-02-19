"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import RedirectLoader from "@/components/shimmer/RedirectLoader";

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const token = user?.token;

    useEffect(() => {
      if (!token) {
        router.replace("/");
      }
    }, [token, router]);

    if (!token) return <RedirectLoader />;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
