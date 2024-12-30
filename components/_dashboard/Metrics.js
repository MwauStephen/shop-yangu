import { Card, CardBody, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import StatsCard from "../StatsCard";
import { FaShop, FaDollarSign, FaBuffer, FaChartLine } from "react-icons/fa6";

const Metrics = () => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
      <GridItem>
        <StatsCard title="Total Shops" value="100" icon={<FaShop />} />
      </GridItem>
      <GridItem>
        <StatsCard title="Total Products" value="100" icon={<FaBuffer />} />
      </GridItem>
      <GridItem>
        <StatsCard title="Total Value" value="50" icon={<FaDollarSign />} />
      </GridItem>
      <GridItem>
        <StatsCard title="Total Stock" value="200" icon={<FaChartLine />} />
      </GridItem>
    </Grid>
  );
};

export default Metrics;
