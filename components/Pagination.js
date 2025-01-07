"use client";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { HStack, Flex } from "@chakra-ui/react";

const Pagination = ({ count, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(count / pageSize); // 10/5 =2 pages

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  return (
    <PaginationRoot
      count={count}
      pageSize={pageSize}
      currentPage={currentPage}
      maxW="240px"
      mx="auto"
    >
      <HStack justify="flex-end">
        <PaginationPageText format="long" flex="1" />
        <PaginationPrevTrigger
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <PaginationNextTrigger
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </HStack>
    </PaginationRoot>
  );
};

export default Pagination;
