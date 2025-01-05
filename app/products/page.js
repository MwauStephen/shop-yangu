import ProductList from "@/components/_product/ProductList";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ProductPage = () => {
  return (
    <Box as="section" p="2rem 1rem">
      <Text as="h1" fontWeight="bold" fontSize="1.2rem" mb={8}>
        Your Product List
      </Text>
      <ProductList />
    </Box>
  );
};

export default ProductPage;
