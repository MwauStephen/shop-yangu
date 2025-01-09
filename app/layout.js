"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "@/components/ui/provider";
import DashboardLayout from "@/components/DashboardLayout";
import { Roboto } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";
import ToastContainer from "@/components/ToastContainer";
import { usePathname, useRouter } from "next/navigation";
import { metadata } from "@/metadata";
import LoadingSpinner from "@/components/LoadingSpinner";

const roboto = Roboto({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
});

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");

    // Redirect unauthenticated users trying to access protected pages
    const protectedPaths = ["/", "/shops", "/products"]; // Add your protected routes here
    if (!authStatus && protectedPaths.includes(pathname)) {
      window.location.href = "/login"; // Redirect to login page
    }
  }, [pathname]);

  // Define paths that should not include the DashboardLayout
  const noLayoutPaths = ["/login", "/logo"];

  const shouldUseDashboardLayout = !noLayoutPaths.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={roboto.className}>
        <Provider>
          <ToastContainer />
          <QueryProvider>
            {shouldUseDashboardLayout ? (
              isAuthenticated ? (
                <DashboardLayout>{children}</DashboardLayout>
              ) : (
                <LoadingSpinner /> // Show a fallback while redirecting
              )
            ) : (
              children
            )}
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
