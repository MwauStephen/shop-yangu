"use client";
import { Box, Card, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";
import UploadButton from "../UploadButton";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useAddShop } from "@/app/_hooks/ShopHooks";

const ShopForm = ({ shopDetailsToEdit = {}, handleClose }) => {
  const { id: editId, ...editValues } = shopDetailsToEdit;
  const isEditSession = Boolean(editId);
  const { addNewShop } = useAddShop();

  const { register, formState, reset, handleSubmit } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // handle form submission
  const handleOnSubmit = async (data) => {
    const image = typeof data.logo === "string" ? data.logo : data.logo[0];
    console.log(data, "data from form");
    addNewShop(
      { ...data, logo: image },
      {
        onSuccess: () => {
          reset();
          handleClose();
        },
      }
    );
  };

  return (
    <Box>
      <Flex
        as="form"
        flexDirection={{ base: "column", md: "column" }}
        gap={4}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Field label="Shop Name" required>
          <Input placeholder="name of shop" {...register("shopName")} />
        </Field>
        <Field label="Shop Description" required>
          <Textarea
            placeholder="Your tech paradise"
            {...register("shopDescription")}
          />
        </Field>
        <Field required label="Shop Logo">
          <UploadButton {...register("logo")} />
        </Field>
        <Box textAlign={{ base: "center", md: "right" }}>
          <Button
            textAlign="left"
            variant="outline"
            // type="reset"
            mr={4}
            key="close"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            textAlign="left"
            bgGradient="to-r"
            gradientFrom="#0da487"
            gradientTo="#20c997"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ShopForm;
