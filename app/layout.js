import React from "react";
import { Provider } from "@/components/ui/provider";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata = {
  title: "Shop Yangu | E-commerce",
  description: "An E-commerce admin dashboard",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <DashboardLayout>{children}</DashboardLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
