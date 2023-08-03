import { Box, Text, VStack, Flex, Icon } from "@chakra-ui/react";
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
      <Flex flexDir={{ base: "column", md: "row" }}>
        <Box
          w={{ base: "100%", md: "25%" }}
          bg={"#2C3E50"}
          color="white"
          minH="100vh"
        >
          <VStack spacing="2" align="stretch">
            <Box w={"full"} bg={"#D27321"} textAlign={"center"}>
              <Text
                fontSize={{ base: "2xl", md: "18" }}
                fontWeight="bold"
                p="4"
              >
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
                <Icon
                  as={IoBagHandleOutline}
                  w={{ base: 4, md: 6 }}
                  h={{ base: 4, md: 6 }}
                />
                <Text
                  fontSize={{ base: "lg", md: "18" }}
                  fontWeight="bold"
                  ml={2}
                >
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
                <Icon
                  as={IoPersonOutline}
                  w={{ base: 4, md: 6 }}
                  h={{ base: 4, md: 6 }}
                />
                <Text
                  fontSize={{ base: "lg", md: "18" }}
                  fontWeight="bold"
                  ml={2}
                >
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
                <Icon
                  as={IoCartOutline}
                  w={{ base: 4, md: 6 }}
                  h={{ base: 4, md: 6 }}
                />
                <Text
                  fontSize={{ base: "lg", md: "18" }}
                  fontWeight="bold"
                  ml={2}
                >
                  Sales Report
                </Text>
              </Box>
            </Link>
          </VStack>
        </Box>
        <Box w={"full"}>{renderPage()}</Box>
      </Flex>
    </Box>
  );
};

export default withAuth(AdminLanding);