import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ShopList from "@/components/_shop/ShopList";
import { getAllShops } from "../_lib/apiServices";

const ShopPage = () => {
  return (
    <Box as="section" p="2rem 1rem">
      <Text as="h1" fontWeight="bold" fontSize="1.2rem" mb={8}>
        Your Shop List
      </Text>

      <ShopList />
    </Box>
  );
};

export default ShopPage;
