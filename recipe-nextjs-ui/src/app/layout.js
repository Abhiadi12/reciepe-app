import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Provider from "@/components/Provider/Provider";
import { Alert } from "@/components/common";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "recipe-app",
  description: "A recipe app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div>
            <Header />
            {children}
          </div>
          <Alert />
        </Provider>
      </body>
    </html>
  );
}
