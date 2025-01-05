"use client";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { HStack, Flex } from "@chakra-ui/react";

const Pagination = () => {
  return (
    <PaginationRoot
      count={50}
      pageSize={5}
      defaultPage={1}
      maxW="240px"
      mx="auto"
    >
      <HStack justify="flex-end">
        <PaginationPageText format="long" flex="1" />
        <PaginationPrevTrigger />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};

export default Pagination;
