// "use client";
import { Box, Card, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import UploadButton from "../UploadButton";
import SelectContainer from "../SelectContainer";
import { useFetchShops } from "@/app/_hooks/ShopHooks";
import { useForm } from "react-hook-form";

const ProductForm = () => {
  const { shops } = useFetchShops();
  const { register, formState, reset, handleSubmit } = useForm();

  // handle form submission
  const handleOnSubmit = (data) => {
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
        <Field required label="Product Image">
          <UploadButton {...register("image")} />
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
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductForm;
