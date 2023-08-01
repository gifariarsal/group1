import React from "react";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import {
  IoPersonOutline,
  IoBagHandleOutline,
  IoCartOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box as={"aside"} w={"64"} bg={"#2C3E50"} color="white" minH="100vh">
      <VStack spacing="4" align="stretch">
        {/* Sidebar header */}
        <Box w={"full"} bg={"#D27321"} textAlign={"center"}>
          <Text fontSize="xl" fontWeight="bold" p="4">
            Admin Dashboard
          </Text>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold" p="2">
            Product Management
          </Text>
        </Box>
        <Box>
          <Link to={"/about"}>
            <Text fontSize="lg" fontWeight="bold" p="2">
              Cashier Management
            </Text>
          </Link>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" p="2">
            Sales Report
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
