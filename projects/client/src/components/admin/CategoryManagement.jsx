import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListCategory from "./ListCategory";
import CreateCategory from "./CreateCategory";

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
const CategoryManagement = () => {
  return (
    <Box w={"full"} minH={"100vh"}>
      <Box
        h={"62px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"#A2AABA"}
        py={4}
        px={8}
      >
        <Box>
          <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight={"medium"}>
            Category Management
          </Text>
        </Box>
      </Box>
      <Box p={4} w={"full"} minH={"100vh"}>
        <Box bg={"white"}>
          <CreateCategory />
        </Box>
        <Box bg={"white"} mt={5}>
          <ListCategory />
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(CategoryManagement);
