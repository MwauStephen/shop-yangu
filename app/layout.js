"use client"; // Mark as Client Component

import React from "react";
import { Provider } from "@/components/ui/provider";
import DashboardLayout from "@/components/DashboardLayout";
import { Roboto } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";
import ToastContainer from "@/components/ToastContainer";
import { usePathname } from "next/navigation";
import { metadata } from "@/metadata";

// loading fonts
const roboto = Roboto({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
});

const RootLayout = ({ children }) => {
  const pathname = usePathname();

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
              <DashboardLayout>{children}</DashboardLayout>
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
