import ShopForm from "@/components/_shop/ShopForm";
import { Card, Text } from "@chakra-ui/react";
import React from "react";

const CreateShopPage = () => {
  return (
    <Card.Root p="2rem 1rem" w={{ base: "100%", md: "50%" }} mx="auto" my={8}>
      <Text as="h1" fontWeight="bold" fontSize="1.2rem" mb={8}>
        Add New Shop
      </Text>
      <ShopForm />
    </Card.Root>
  );
};

export default CreateShopPage;
