"use client";
import { Box, Card, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import UploadButton from "../UploadButton";
import SelectContainer from "../SelectContainer";
import { useFetchShops } from "@/app/_hooks/ShopHooks";
import { useForm } from "react-hook-form";
import { useAddProduct, useUpdateProduct } from "@/app/_hooks/ProductsHooks";

const ProductForm = ({ productDetailsToEdit = {}, handleClose }) => {
  const { shops } = useFetchShops();
  const { id: editId, ...editValues } = productDetailsToEdit;

  const isEditSession = Boolean(editId);

  const { register, formState, reset, handleSubmit } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { addNewProduct } = useAddProduct();
  const { updateProduct } = useUpdateProduct();

  // handle form submission
  const handleOnSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      updateProduct(
        { updateProductData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            handleClose();
          },
        }
      );
    } else {
      addNewProduct(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            handleClose();
          },
        }
      );
    }

    console.log(data, "data from form");
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Flex flexDirection={{ base: "column", md: "column" }} gap={4}>
        <Field label="Product Name" required>
          <Input placeholder="name of product" {...register("productName")} />
        </Field>
        <Field label="Product Price" required>
          <Input placeholder="Ksh 100" {...register("price")} />
        </Field>
        <Field label="Stock Level" required>
          <Input placeholder="30" {...register("stockLevel")} />
        </Field>
        <Field label="Product Description" required>
          <Textarea
            placeholder="Latest model with high-end features"
            {...register("productDescription")}
          />
        </Field>
        <Field label="Select Shop">
          <SelectContainer
            title="Select A Shop"
            placeholder="select shop"
            data={shops}
            register={register("shopName")}
          />
        </Field>
        <Field required={!isEditSession} label="Product Image">
          <UploadButton {...register("image")} />
        </Field>
        <Box textAlign={{ base: "center", md: "right" }}>
          <Button
            textAlign="left"
            variant="outline"
            type="reset"
            mr={4}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            textAlign="left"
            bgGradient="to-r"
            gradientFrom="#0da487"
            gradientTo="#20c997"
            type="submit"
          >
            {isEditSession ? "Update" : "Add"} Product
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductForm;
