import {
  Card,
  Table,
  Text,
  IconButton,
  Flex,
  Button,
  Box,
  Stack,
  Badge,
} from "@chakra-ui/react";

import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import Pagination from "../Pagination";
import ViewCard from "../ViewCard";
import Image from "next/image";
import ShopForm from "./ShopForm";

const items = [
  {
    id: 1,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    status: "Active",
    logo: "/shop-1.jpg",
  },
  {
    id: 2,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    status: "Active",
    logo: "/shop-1.jpg",
  },
  {
    id: 3,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    status: "Active",
    logo: "/shop-1.jpg",
  },
  {
    id: 4,
    name: "Fashion Fiesta",
    description: "Your tech paradise.",
    status: "Active",
    logo: "/shop-1.jpg",
  },
  {
    id: 5,
    name: "Fashion Fiesta",
    description:
      "Your tech paradise.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    status: "Active",
    logo: "/shop-1.jpg",
  },
];

const ShopList = ({ shops = [] }) => {
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
          title="Add New Shop"
        >
          <ShopForm />
        </ViewCard>
      </Box>

      <Table.ScrollArea>
        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Shop No.</Table.ColumnHeader>
              <Table.ColumnHeader>Shop Name</Table.ColumnHeader>
              <Table.ColumnHeader>Shop Description</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Shop Status
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Shop Logo</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Shop Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {shops.map((item, index) => {
              const status = item.products.length > 0 ? "Active" : "Inactive";
              return (
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
                  <Table.Cell textAlign="end">
                    <Badge colorPalette={status === "Active" ? "green" : "red"}>
                      {status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex justifyContent="flex-end">
                      <Image
                        src={item.logo}
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
                        title="Shop Details"
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
                            <b>Shop Name:</b> {item.name}
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
                        <ShopForm shopDetailsToEdit={item} />
                      </ViewCard>

                      <ViewCard
                        triggerContent={
                          <IconButton size="2xs" background="red.600">
                            <FaTrash size="1px" />
                          </IconButton>
                        }
                        title={`Delete ${item.name} Shop`}
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
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Pagination />
          </Table.Footer>
        </Table.Root>
      </Table.ScrollArea>
    </Card.Root>
  );
};

export default ShopList;
