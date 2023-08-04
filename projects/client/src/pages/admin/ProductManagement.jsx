import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import CreateCategory from "../../components/admin/CreateCategory";
import ListCategory from "../../components/admin/ListCategory";
import ListProduct from "../../components/products/ListProduct";

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
const ProductManagement = () => {
  return (
    <Box>
      <Navbar />
      <Box w={"100%"} bg={"red.100"}>
        <Flex>
          <Box>
            <AdminSidebar />
          </Box>
          <Stack ml={10} mt={5}>
            <Box bg={"white"}>
              <CreateCategory />
            </Box>
            <Box bg={"white"} mt={5}>
              <ListCategory />
            </Box>
          </Stack>
          <Box mt={5} ml={10} bg={"white"}>
            <ListProduct/>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default withAuth(ProductManagement);
