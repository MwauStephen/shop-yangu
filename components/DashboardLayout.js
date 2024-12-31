"use client"; // Mark as Client Component for usePathname
import { usePathname } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import SideNav from "./SideNav";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // handler function to toggle the sidebar
  const handleToggle = () => {
    console.log("we are collpasing");
    setIsCollapsed((prev) => !prev);
  };
  return (
    <Flex>
      <Box
        as="aside"
        w={isCollapsed ? "60px" : "200px"}
        p="1rem"
        boxShadow="lg"
        bgGradient="to-b"
        gradientFrom="#0da487"
        gradientTo="#20c997"
        transition="width 0.2s ease"
      >
        <SideNav isCollapsed={isCollapsed} onCollapseToggle={handleToggle} />
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
