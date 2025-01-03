"use client";
import { Card, CardBody, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { Box } from "@chakra-ui/react";
import StockGraph from "@/components/_dashboard/StockGraph";
import TopShops from "@/components/_dashboard/TopShops";
import Metrics from "@/components/_dashboard/Metrics";
import ShopList from "@/components/_shop/ShopList";
import ProductList from "@/components/_product/ProductList";
import { useFetchShops } from "./_hooks/ShopHooks";

const HomePage = () => {
  const { shops } = useFetchShops();
  return (
    <Box as="section" p="2rem 1rem">
      <Text as="h1" fontWeight="bold" fontSize="1.2rem" mb={8}>
        Welcome to Shop Yangu panel
      </Text>
      <Box as="section" my={8}>
        <Metrics />
      </Box>
      <Box as="section" my={8}>
        <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
          <StockGraph />
          <TopShops />
        </Flex>
      </Box>

      <Box as="section" my={8}>
        <ShopList shops={shops} />
      </Box>
      <Box as="section" my={8}>
        <ProductList />
      </Box>
    </Box>
  );
};

export default HomePage;
