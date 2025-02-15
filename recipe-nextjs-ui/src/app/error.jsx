"use client";
import Link from "next/link";

export default function ErrorBoundary() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h3 className="text-4xl text-ward text-red-500">
          An error occurred. Please try again later.
        </h3>
        <p>We are fixing it , please try again later. </p>
        <Link
          href="/"
          className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
