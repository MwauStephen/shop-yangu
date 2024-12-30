import { Card, Table, Text, IconButton, Flex } from "@chakra-ui/react";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import Pagination from "../Pagination";

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];

const ShopList = () => {
  return (
    <Card.Root p={4} boxShadow="xl">
      <Table.Root size="sm" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Shop No.</Table.ColumnHeader>
            <Table.ColumnHeader>Shop Name</Table.ColumnHeader>
            <Table.ColumnHeader>Shop Description</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Shop Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Shop Logo</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Shop Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, index) => (
            <Table.Row key={item.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell textAlign="end">{item.price}</Table.Cell>
              <Table.Cell textAlign="end">{item.price}</Table.Cell>
              <Table.Cell textAlign="end">
                <Flex justifyContent="space-around">
                  <IconButton size="xs" background="teal">
                    <FaEye size="1px" />
                  </IconButton>

                  <IconButton size="xs" background="teal">
                    <FaPencil size="1px" />
                  </IconButton>
                  <IconButton size="xs" background="teal">
                    <FaTrash size="1px" />
                  </IconButton>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Pagination/>
        </Table.Footer>
      </Table.Root>
    </Card.Root>
  );
};

export default ShopList;
