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
            {items.map((item, index) => (
              <Table.Row key={item.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell
                  maxWidth="300px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {item.description}
                </Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell textAlign="end">{item.stock}</Table.Cell>
                <Table.Cell textAlign="end">
                  <Flex justifyContent="flex-end">
                    <Image
                      src={item.image}
                      width={40}
                      height={40}
                      alt={item.name}
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
                            src={item.logo}
                            width={400}
                            height={400}
                            alt={item.name}
                          />
                        </Text>
                        <Text>
                          <b>Product Name:</b> {item.name}
                        </Text>
                        <Text>
                          <b>Description: </b> {item.description}
                        </Text>
                      </Stack>
                    </ViewCard>

                    <ViewCard
                      triggerContent={
                        <IconButton size="2xs" background="blue.500">
                          <FaPencil size="1px" />
                        </IconButton>
                      }
                      title={`Edit ${item.name}`}
                    >
                      <ProductForm />
                    </ViewCard>

                    <ViewCard
                      triggerContent={
                        <IconButton size="2xs" background="red.600">
                          <FaTrash size="1px" />
                        </IconButton>
                      }
                      title={`Delete ${item.name} Product`}
                      footerActions={[
                        <Flex gap={2} key={item.id}>
                          <Button key="close" variant="outline">
                            Close
                          </Button>
                          <Button key="close" colorPalette="red">
                            Delete
                          </Button>
                        </Flex>,
                      ]}
                    >
                      <Text>
                        Are you sure you want to delete {` ${item.name}`}?This
                        action cannot be undone.
                      </Text>
                    </ViewCard>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Pagination />
          </Table.Footer>
        </Table.Root>
      </Table.ScrollArea>
    </Card.Root>
  );
};

export default ProductList;
