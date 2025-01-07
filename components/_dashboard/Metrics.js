import { Card, CardBody, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import StatsCard from "../StatsCard";
import { FaShop, FaDollarSign, FaBuffer, FaChartLine } from "react-icons/fa6";
import { useFetchShops } from "@/app/_hooks/ShopHooks";
import {
  useFetchProducts,
  useProductSummary,
} from "@/app/_hooks/ProductsHooks";
import { getProductSummary } from "@/app/_lib/apiServices";
import { formatCurrency } from "@/app/_utils/helpers";

const Metrics = () => {
  const { count: shopCount } = useFetchShops();
  const { count: productCount } = useFetchProducts();
  const { data } = useProductSummary();
  // const { totalValue, totalStockLevel } = useProductSummary();

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
      <GridItem>
        <StatsCard title="Total Shops" value={shopCount} icon={<FaShop />} />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Total Products"
          value={productCount}
          icon={<FaBuffer />}
        />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Total Value"
          value={formatCurrency(data?.totalValue)}
          // value="100"
          icon={<FaDollarSign />}
        />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Total Stock"
          value={data?.totalStockLevel}
          // value="100"
          icon={<FaChartLine />}
        />
      </GridItem>
    </Grid>
  );
};

export default Metrics;
