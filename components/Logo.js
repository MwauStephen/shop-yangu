import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";

const Logo = () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Avatar
        name="shop-yangu"
        src="/shop-2.png"
        size="lg"
        boxSize="50px"
        // shape="full"
        // border="2px solid #ff4500"
      />
      <Text as="h2" fontWeight="bold">
        Shop Yangu
      </Text>
    </Flex>
  );
};

export default Logo;
