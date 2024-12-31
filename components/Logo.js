import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";

const Logo = ({ isCollapsed }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Avatar
        name="shop-yangu"
        src="/shop-2.png"
        size="lg"
        boxSize={isCollapsed ? "30px" : "60px"}
      />
      {!isCollapsed && (
        <Text as="h2" fontWeight="bold" color="#fff" mt={2}>
          Shop Yangu
        </Text>
      )}
    </Flex>
  );
};

export default Logo;
