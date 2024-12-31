"use client";
import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaHouse, FaShop, FaCartShopping } from "react-icons/fa6";
import Logo from "./Logo";
import { Tooltip } from "./ui/tooltip";

const SideNav = ({ isCollapsed, onCollapseToggle }) => {
  return (
    <Flex
      flexDirection="column"
      p={isCollapsed ? 1 : 4}
      as="nav"
      h="100vh"
      mt={2}
      w={isCollapsed ? "60px" : "200px"}
      alignItems={isCollapsed ? "baseline" : "flex-start"}
      transition="width 0.2s ease"
    >
      <Box mb={8} cursor="pointer" onClick={onCollapseToggle}>
        <Logo isCollapsed={isCollapsed} />
      </Box>
      <Tooltip content="Home" positioning={{ placement: "right-end" }}>
        <Link href="/">
          <Flex
            as="div"
            mb={4}
            alignItems="center"
            gap={4}
            fontSize="1.2rem"
            color="#fff"
          >
            <FaHouse />
            {!isCollapsed && <Text>Home</Text>}
          </Flex>
        </Link>
      </Tooltip>
      <Tooltip content="Shop" positioning={{ placement: "right-end" }}>
        <Link href="/shop">
          <Flex
            as="div"
            mb={4}
            alignItems="center"
            gap={4}
            fontSize="1.2rem"
            color="#fff"
          >
            <FaShop />
            {!isCollapsed && <Text>Shop</Text>}
          </Flex>
        </Link>
      </Tooltip>

      <Tooltip content="Products" positioning={{ placement: "right-end" }}>
        <Link href="products">
          <Flex
            as="div"
            mb={4}
            alignItems="center"
            gap={4}
            fontSize="1.2rem"
            color="#fff"
          >
            <FaCartShopping />
            {!isCollapsed && <Text>Products</Text>}
          </Flex>
        </Link>
      </Tooltip>
    </Flex>
  );
};

export default SideNav;
