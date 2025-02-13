"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page not found</p>
      <p className="text-md text-gray-500 mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
