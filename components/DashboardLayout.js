"use client"; // Mark as Client Component for usePathname
import { usePathname } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import Logo from "./Logo";
import SideNav from "./SideNav";

const DashboardLayout = ({ children }) => {
  return (
    <Flex height="100vh">
      <Box
        as="aside"
        flex="0 0 20%"
        p="1rem"
        boxShadow="lg"
        bgGradient="to-b"
        gradientFrom="#0da487"
        gradientTo="#20c997"
      >
        <Logo />
        <SideNav />
      </Box>

      {/* Header and main content */}
      <Box as="main" flex="1" bg="#fff">
        <Header />
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;

// const Layout = ({ children }) => {
//   const pathname = usePathname();

//   // Define routes that shouldn't use the layout
//   const noLayoutRoutes = ["/login"];

//   // Determine if the layout should be applied
//   const shouldUseLayout = !noLayoutRoutes.includes(pathname);

//   return shouldUseLayout ? (
//     <Flex height="100vh">
//       {/* Sidebar */}
//       <Box as="aside" flex="0 0 20%" bg="green">
//         sidenav component
//       </Box>

//       {/* Header and main content */}
//       <Box as="main" flex="1" bg="red">
//         <Header />
//         {children}
//       </Box>
//     </Flex>
//   ) : (
//     // Directly render children if no layout is needed
//     <>{children}</>
//   );
// };

// export default Layout;
