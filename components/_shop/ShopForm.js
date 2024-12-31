"use client";
import { Box, Card, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";
import UploadButton from "../UploadButton";
import { Button } from "../ui/button";

const ShopForm = () => {
  return (
    <Box>
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
