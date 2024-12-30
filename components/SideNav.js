import React from "react";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { FaHouse, FaShop, FaCartShopping } from "react-icons/fa6";

const SideNav = () => {
  return (
    <Flex flexDirection="column" p="4" as="nav" h="100%" mt={8}>
      <Flex as="div" mb={4} alignItems="center" gap={4} fontSize="1.2rem">
        <FaHouse />
        <Link href="/">Home</Link>
      </Flex>
      <Flex as="div" mb={4} alignItems="center" gap={4} fontSize="1.2rem">
        <FaShop />
        <Link href="/shop">Shop</Link>
      </Flex>
      <Flex as="div" mb={4} alignItems="center" gap={4} fontSize="1.2rem">
        <FaCartShopping />
        <Link href="products">Products</Link>
      </Flex>
    </Flex>
  );
};

export default SideNav;
