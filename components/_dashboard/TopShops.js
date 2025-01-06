"use client";
import { useFetchStockStatus } from "@/app/_hooks/ProductsHooks";
import { Card, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Empty from "../Empty";
import LoadingSpinner from "../LoadingSpinner";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c"];

// // dummy data
// const topShopsDataDummy = [
//   { shopName: "Shop A", stock: 120 },
//   { shopName: "Shop B", stock: 95 },
//   { shopName: "Shop C", stock: 80 },
//   { shopName: "Shop D", stock: 75 },
//   { shopName: "Shop E", stock: 60 },
// ];

const TopShops = () => {
  const { data, isLoading } = useFetchStockStatus();
  const topShopsData = data?.topShops || [];

  if (isLoading) return <LoadingSpinner />;

  if (topShopsData.length === 0)
    return <Empty title="No top shops data" path="shop/create" />;

  return (
    <Card.Root flex="0 0 50%" p={4} boxShadow="xl">
      <Text as="h3" fontWeight="bold" textAlign="center" mb={4}>
        Top 5 Shops by Stock Level
      </Text>
      <ResponsiveContainer>
        <BarChart
          data={topShopsData}
          layout="vertical" // Horizontal bars
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="shopName" />
          <Tooltip />
          <Bar dataKey="stock" fill="#20c997">
            {topShopsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card.Root>
  );
};

export default TopShops;
