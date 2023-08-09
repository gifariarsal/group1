import { Box, Text, Flex, } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import CashierSidebar from "../../components/cashier/CashierSidebar";
import ListProduct from "../../components/cashier/ListProduct";
import Cart from "../../components/cashier/Cart";

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



const CashierLanding = () => {
  return (
    <Box>
      <Navbar />
      <Box w={"100%"} p={10} >
        <Flex flexDir={{ base: "column-reverse", lg: "row" }} >
          <Box mt={"60px"} w={{ base: "100%", lg:"70%"}}  rounded={"2xl"} p={5}>
            <ListProduct />
          </Box>
          <Box bg={"#2C3E50"} mt={"60px"} w={{ base: "100%", lg:"30%"}} rounded={"2xl"} p={5}>
            <Cart/>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default withAuth(CashierLanding);
