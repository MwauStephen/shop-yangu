import React from "react";
import { Provider } from "@/components/ui/provider";
import DashboardLayout from "@/components/DashboardLayout";
import { Roboto } from "next/font/google";

// loading fonts
const roboto = Roboto({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shop Yangu | E-commerce",
  description: "An E-commerce admin dashboard",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider>
          <DashboardLayout>{children}</DashboardLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
