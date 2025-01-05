"use client";
import {
  Card,
  Table,
  IconButton,
  Flex,
  Button,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import Pagination from "../Pagination";
import Image from "next/image";
import ProductForm from "./ProductForm";
import ViewCard from "../ViewCard";
import { useDeleteProduct, useFetchProducts } from "@/app/_hooks/ProductsHooks";
import Empty from "../Empty";
import Link from "next/link";

const items = [
  {
    id: 1,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    price: "Ksh 500.",
    stock: 30,
    image: "/shop-1.jpg",
  },
  {
    id: 2,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    price: "Ksh 500.",
    stock: 30,
    image: "/shop-1.jpg",
  },
  {
    id: 3,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    price: "Ksh 500.",
    stock: 30,
    image: "/shop-1.jpg",
  },
  {
    id: 4,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    price: "Ksh 500.",
    stock: 30,
    image: "/shop-1.jpg",
  },
  {
    id: 5,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    price: "Ksh 500.",
    stock: 30,
    image: "/shop-1.jpg",
  },
  {
    id: 6,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    price: "Ksh 500.",
    stock: 30,
    image: "/shop-1.jpg",
  },
];

const ProductList = () => {
  const { products } = useFetchProducts();
  const { deleteProduct } = useDeleteProduct();

  if (products?.length === 0)
    return (
      <Empty
        title="No products found.Please add a product."
        action="Add Product"
        path="products/create"
      />
    );
  return (
    <Card.Root p={4} boxShadow="xl">
      <Box textAlign="end" mb={4}>
        <ViewCard
          triggerContent={
            <Button
              bgGradient="to-r"
              gradientFrom="#0da487"
              gradientTo="#20c997"
            >
              Add New
            </Button>
          }
          title="Add New Product"
        >
          <ProductForm />
        </ViewCard>
        <Text>Filter component</Text>
      </Box>

      <Table.ScrollArea>
        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Product No.</Table.ColumnHeader>
              <Table.ColumnHeader>Product Name</Table.ColumnHeader>
              <Table.ColumnHeader>Product Description</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Stock Level
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Product Image
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Product Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products?.map((product, index) => (
              <Table.Row key={product.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{product.productName}</Table.Cell>
                <Table.Cell
                  maxWidth="300px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {product.productDescription}
                </Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell textAlign="end">{product.stockLevel}</Table.Cell>
                <Table.Cell textAlign="end">
                  <Flex justifyContent="flex-end">
                    <Image
                      src={product.image}
                      width={40}
                      height={40}
                      alt={product.productName}
                    />
                  </Flex>
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <Flex justifyContent="space-around">
                    <ViewCard
                      triggerContent={
                        <IconButton background="teal" size="2xs">
                          <FaEye />
                        </IconButton>
                      }
                      title="Product Details"
                      footerActions={[
                        <Button key="close" variant="outline">
                          Close
                        </Button>,
                      ]}
                    >
                      <Stack spacing={4}>
                        <Text>
                          <Image
                            src={product.image}
                            width={400}
                            height={400}
                            alt={product.productName}
                          />
                        </Text>
                        <Text>
                          <b>Product Name:</b> {product.productName}
                        </Text>
                        <Text>
                          <b>Description: </b> {product.productDescription}
                        </Text>
                      </Stack>
                    </ViewCard>

                    <ViewCard
                      triggerContent={
                        <IconButton size="2xs" background="blue.500">
                          <FaPencil size="1px" />
                        </IconButton>
                      }
                      title={`Edit ${product.productName}`}
                    >
                      <ProductForm productDetailsToEdit={product} />
                    </ViewCard>

                    <ViewCard
                      triggerContent={
                        <IconButton size="2xs" background="red.600">
                          <FaTrash size="1px" />
                        </IconButton>
                      }
                      title={`Delete ${product.productName} Product`}
                      footerActions={[
                        <Flex gap={2} key={product.id}>
                          <Button key="close" variant="outline">
                            Close
                          </Button>
                          <Button
                            key={product.id}
                            colorPalette="red"
                            onClick={() => [deleteProduct(product.id)]}
                          >
                            Delete
                          </Button>
                        </Flex>,
                      ]}
                    >
                      <Text>
                        Are you sure you want to delete{" "}
                        {` ${product.productName}`}?This action cannot be
                        undone.
                      </Text>
                    </ViewCard>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Pagination />
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </Table.ScrollArea>
    </Card.Root>
  );
};

export default ProductList;
