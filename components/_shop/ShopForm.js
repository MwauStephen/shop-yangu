"use client";
import { Box, Card, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../ui/file-upload";
import { Button } from "../ui/button";
import { HiUpload } from "react-icons/hi";

const ShopForm = () => {
  return (
    <Box>
      {/* <Text fontSize="1.2rem" fontWeight="bold" mb={4}>
        Add Shop
      </Text> */}
      <Flex as="form" flexDirection={{ base: "column", md: "column" }} gap={4}>
        <Field label="Shop Name" required>
          <Input placeholder="name of shop" />
        </Field>
        <Field label="Shop Description" required>
          <Textarea placeholder="Your tech paradise" />
        </Field>
        <Field required label="Shop Logo">
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
      {/* </Card.Root> */}
    </Box>
  );
};

export default ShopForm;

const UploadButton = () => {
  return (
    <FileUploadRoot>
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUploadTrigger>
      <FileUploadList />
    </FileUploadRoot>
  );
};
