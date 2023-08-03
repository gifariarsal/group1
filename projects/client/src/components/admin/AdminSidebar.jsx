import React, { useState } from "react";
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import {
  IoPersonOutline,
  IoBagHandleOutline,
  IoCartOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import ProductManagement from "./ProductManagement";
import CashierManagement from "./CashierManagement";
import SalesReport from "./SalesReport";

const AdminSidebar = () => {
  const [activePage, setActivePage] = useState("product");
  const renderPage = () => {
    switch (activePage) {
      case "product":
        return <ProductManagement />;
      case "cashier":
        return <CashierManagement />;
      case "report":
        return <SalesReport />;
      default:
        return null;
    }
  };
  return (
    <Box as={"aside"} w={"64"} bg={"#2C3E50"} color="white" minH="100vh">
      <VStack spacing="2" align="stretch">
        <Box w={"full"} bg={"#D27321"} textAlign={"center"}>
          <Text fontSize="xl" fontWeight="bold" p="4">
            Admin Dashboard
          </Text>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          p={"4"}
          bg={"#2C3E50"}
          _hover={{ bg: "#4E586E" }}
        >
          <Button onClick={() => setActivePage("product")}>
            <IoBagHandleOutline size={24} />
            <Text fontSize="lg" fontWeight="bold" ml={2}>
              Product Management
            </Text>
          </Button>
        </Box>
        <Link as={"button"} onClick={() => setActivePage("cashier")}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"4"}
            _hover={{ bg: "#4E586E" }}
          >
            <IoPersonOutline size={10} />
            <Text fontSize="lg" fontWeight="bold" ml={2}>
              Cashier Management
            </Text>
          </Box>
        </Link>
        <Link as={"button"} onClick={() => setActivePage("report")}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"4"}
            _hover={{ bg: "#4E586E" }}
          >
            <IoCartOutline size={24} />
            <Text fontSize="lg" fontWeight="bold" ml={2}>
              Sales Report
            </Text>
          </Box>
        </Link>
        {renderPage()}
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
