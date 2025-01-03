import React from "react";
import { Provider } from "@/components/ui/provider";
import DashboardLayout from "@/components/DashboardLayout";
import { Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider>
          <QueryClientProvider client={queryClient} />
          <ReactQueryDevtools initialIsOpen={false} />
          <DashboardLayout>{children}</DashboardLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
