"use client";
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
import { useDeleteShop, useFetchShops } from "@/app/_hooks/ShopHooks";
import Empty from "../Empty";
import { ITEMS_PER_PAGE } from "@/app/_utils/constants";
import LoadingSpinner from "../LoadingSpinner";

const ShopList = () => {
  const { shops, count, currentPage, setCurrentPage, isLoading } =
    useFetchShops();
  const { deleteShop } = useDeleteShop();

  if (isLoading) return <LoadingSpinner />;

  if (shops?.length === 0)
    return (
      <Empty
        title="No shops found.Please add a shop."
        action="Add Shop"
        path="shops/create"
      />
    );

  // handler function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
            {shops?.map((item, index) => {
              // const status = item.products.length > 0 ? "Active" : "Inactive";
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>{(currentPage - 1) * 5 + index + 1}</Table.Cell>
                  {/* <Table.Cell>{index + 1}</Table.Cell> */}
                  <Table.Cell>{item.shopName}</Table.Cell>
                  <Table.Cell
                    maxWidth="300px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.shopDescription}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <Badge
                      colorPalette={
                        item.shopStatus === "Active" ? "green" : "red"
                      }
                    >
                      {item.shopStatus}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex justifyContent="flex-end">
                      <Image
                        src={item.logo}
                        width={40}
                        height={40}
                        alt={item.shopName}
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
                              alt={item.shopName}
                            />
                          </Text>
                          <Text>
                            <b>Shop Name:</b> {item.shopName}
                          </Text>
                          <Text>
                            <b>Description: </b> {item.shopDescription}
                          </Text>
                        </Stack>
                      </ViewCard>

                      <ViewCard
                        triggerContent={
                          <IconButton size="2xs" background="blue.500">
                            <FaPencil size="1px" />
                          </IconButton>
                        }
                        title={`Edit ${item.shopName}`}
                      >
                        <ShopForm shopDetailsToEdit={item} />
                      </ViewCard>

                      <ViewCard
                        triggerContent={
                          <IconButton size="2xs" background="red.600">
                            <FaTrash size="1px" />
                          </IconButton>
                        }
                        title={`Delete ${item.shopName} Shop`}
                        footerActions={[
                          <Flex gap={2} key={item.id}>
                            <Button variant="outline">Close</Button>
                            <Button
                              colorPalette="red"
                              onClick={() => {
                                deleteShop(item.id);
                              }}
                            >
                              Delete
                            </Button>
                          </Flex>,
                        ]}
                      >
                        <Text>
                          Are you sure you want to delete {` ${item.shopName}`}
                          ?This action cannot be undone.
                        </Text>
                      </ViewCard>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Pagination
                count={count}
                pageSize={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </Table.ScrollArea>
    </Card.Root>
  );
};

export default ShopList;
