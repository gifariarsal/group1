import { Box, Text, Flex, } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import CashierSidebar from "../../components/cashier/CashierSidebar";
import ListProduct from "../../components/cashier/ListProduct";

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
      <Box w={"100%"} bg={"red.100"}>
        <Flex>
          <Box>
            <CashierSidebar />
          </Box>
          <Box>
            <ListProduct />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default withAuth(CashierLanding);
