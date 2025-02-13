import AuthpageClient from "@/components/authentication/AuthpageClient";

export const metadata = {
  title: "Sign In | Your App Name",
  description: "Sign in to your account to access all features.",
};

export default function AuthPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <AuthpageClient />
    </div>
  );
}
