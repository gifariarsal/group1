import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import ProductManagement from "../../components/admin/ProductManagement";
import CashierManagement from "../../components/admin/CashierManagement";
import SalesReport from "../../components/admin/SalesReport";
import {
  IoBagHandleOutline,
  IoCartOutline,
  IoPersonOutline,
} from "react-icons/io5";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const isAuthenticated = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
const AdminLanding = () => {
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
    <Box>
      <Navbar />
      <Flex>
        <Box w={"25%"} bg={"#2C3E50"} color="white" minH="100vh">
          <VStack spacing="2" align="stretch">
            {/* Sidebar header */}
            <Box w={"full"} bg={"#D27321"} textAlign={"center"}>
              <Text fontSize="xl" fontWeight="bold" p="4">
                Admin Dashboard
              </Text>
            </Box>

            <Link as={"button"} onClick={() => setActivePage("product")}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                p={"4"}
                bg={"#2C3E50"}
                _hover={{ bg: "#4E586E" }}
              >
                <IoBagHandleOutline size={24} />
                <Text fontSize="lg" fontWeight="bold" ml={2}>
                  Product Management
                </Text>
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("cashier")}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                p={"4"}
                _hover={{ bg: "#4E586E" }}
              >
                <IoPersonOutline size={24} />
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
          </VStack>
        </Box>
        <Box w={"full"} bg={"gray.100"}>{renderPage()}</Box>
      </Flex>
    </Box>
  );
};

export default withAuth(AdminLanding);
