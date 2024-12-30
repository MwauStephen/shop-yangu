"use client";

import { Box, Card, Flex, Text, IconButton } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { IconButton } from "@chakra-ui/react";
import { FaShop, FaDollarSign, FaBuffer, FaChartLine } from "react-icons/fa6";

const statsItems = [
  { title: "Total Shops", value: 100, Icon: FaShop },
  { title: "Total  Products", value: 100, Icon: FaBuffer },
  { title: "Total Product Value", value: 100, Icon: FaDollarSign },
  { title: "Total Stock", value: 100, Icon: FaChartLine },
];

const StatsCard = ({ value, title, icon }) => {
  return (
    <Card.Root
      width="250px"
      bg="#fff"
      borderRadius="lg"
      boxShadow={{ base: "none", md: "md" }}
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", scale: "1.05" }}
      
    >
      <Card.Body gap="2">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex
            flexDirection="column"
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Text as="h4">{title}</Text>
            <Card.Title mt="1">{value}</Card.Title>
          </Flex>
          <IconButton
            background="green.500"
            color="white"
            size="lg"
            rounded="full"
          >
            {icon}
          </IconButton>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

export default StatsCard;
