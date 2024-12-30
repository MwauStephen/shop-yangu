import { Card, Text, useTheme } from "@chakra-ui/react";
import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";

//  dynamic data from your project categories:displays as default
const stockData = [
  { status: "In Stock", count: 30 }, // Products with stock > 5
  { status: "Low Stock", count: 12 }, // Products with stock between 1 and 5
  { status: "Out of Stock", count: 8 }, // Products with stock = 0
];

// Custom active shape renderer
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={20}>
        {payload.status}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`Stock: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const StockGraph = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Card.Root flex="0 0 50%" p={4} boxShadow="xl">
      <Text as="h3" fontWeight="bold" textAlign="center" mb={4}>
        Stock Status Distribution
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={stockData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill={`#20c997`}
            dataKey="count"
            onMouseEnter={onPieEnter}
          />

          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            fontSize={12}
            formatter={(value, entry) => {
              const stockStatus = stockData.find(
                (item) => item.status === value
              );
              console.log("stockStatus", stockStatus);
              return (
                <span
                  style={{
                    fontSize: "11px",
                    color: `#000`,
                  }}
                >
                  {`${entry.payload.status} (${entry.payload.count})`}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card.Root>
  );
};

export default StockGraph;

// {`${count} (${status.count})`}
