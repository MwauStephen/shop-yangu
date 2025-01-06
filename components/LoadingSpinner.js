import React from "react";
import { Spinner, VStack } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <VStack mx="auto" my={8}>
      <Spinner size="xl" color="#20c997" />;
    </VStack>
  );
};

export default LoadingSpinner;
