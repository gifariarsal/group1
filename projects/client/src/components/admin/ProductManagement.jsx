import {
  Avatar,
  Box,
  Button,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddProduct from "./AddProduct";
import axios from "axios";

const ProductManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState([]);

  // const fetchProduct = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/cashier");
  //     setProduct(response.data.result);
  //   } catch (error) {
  //     console.error("error fetching cashier data", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  const onCreate = () => {
    onOpen();
  };
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
          <Text fontSize={"2xl"} fontWeight={"medium"}>
            Product Management
          </Text>
        </Box>
        <Box>
          <Button
            onClick={onCreate}
            gap={2}
            rounded={"lg"}
            bg={"#F9CDA6"}
            _hover={{ bg: "#F2D7C0" }}
          >
            <IoAddOutline size={24} />
            Add Product
          </Button>
        </Box>
      </Box>
      <Box p={4} w={"full"} minH={"100vh"}>
        <VStack gap={4}>
          <Box
            py={2}
            px={8}
            rounded={"lg"}
            bg={"white"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"full"}
          >
            <Avatar size={"sm"} name="Mafia" src={"/profile"} />
            <Text>username</Text>
            <Text>email</Text>
            <Text>status</Text>
            <Box>
              <Button mr={4} size={"sm"}>
                Active
              </Button>
              <Button size={"sm"}>Inactive</Button>
            </Box>
          </Box>
        </VStack>
      </Box>
      <AddProduct isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};

export default ProductManagement;