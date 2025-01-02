import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "./ui/input-group";
import { FaSearchengin } from "react-icons/fa6";
import { Avatar } from "./ui/avatar";

const Header = () => {
  return (
    <Box as="header" bg="#fff" p="4" boxShadow="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Text as="h1" fontSize="1.2rem" fontWeight="bold">
          Shop Yangu
        </Text>
        <Box>
          <InputGroup startElement={<FaSearchengin />} flex="1" w="30rem">
            <Input placeholder="Username" />
          </InputGroup>
        </Box>
        <Box>
          <Avatar />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
