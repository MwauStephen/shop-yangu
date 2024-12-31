"use client";
import { Box, Card, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import UploadButton from "../UploadButton";

const ProductForm = () => {
  return (
    <Box>
      <Flex as="form" flexDirection={{ base: "column", md: "column" }} gap={4}>
        <Field label="Product Name" required>
          <Input placeholder="name of product" />
        </Field>
        <Field label="Product Price" required>
          <Input placeholder="Ksh 100" />
        </Field>
        <Field label="Stock Level" required>
          <Input placeholder="30" />
        </Field>
        <Field label="Product Description" required>
          <Textarea placeholder="Latest model with high-end features" />
        </Field>
        <Field required label="Product Image">
          <UploadButton />
        </Field>
        <Box textAlign={{ base: "center", md: "right" }}>
          <Button textAlign="left" variant="outline" type="reset" mr={4}>
            Cancel
          </Button>
          <Button
            textAlign="left"
            bgGradient="to-r"
            gradientFrom="#0da487"
            gradientTo="#20c997"
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductForm;
