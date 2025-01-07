import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ShopList from "@/components/_shop/ShopList";
import { getAllShops } from "../_lib/apiServices";

const ShopPage = async () => {
  // const shops = await getAllShops();
  return (
    <Box as="section" p="2rem 1rem">
      <Text as="h1" fontWeight="bold" fontSize="1.2rem" mb={8}>
        Your Shop List
      </Text>

      <ShopList />
      {/* <ShopList shops={shops} /> */}
    </Box>
  );
};

export default ShopPage;
