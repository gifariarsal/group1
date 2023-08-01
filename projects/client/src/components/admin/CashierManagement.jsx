import { Box, Button, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddCashier from "./AddCashier";
import axios from "axios";

const CashierManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cashier, setCashier] = useState([]);

  const fetchCashier = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/cashier"
      );
      setCashier(response.data.result);
    } catch (error) {
      console.error("error fetching cashier data", error);
    }
  };

  useEffect(() => {
    fetchCashier();
  }, []);

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
            Cashier Management
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
            Add Cashier
          </Button>
        </Box>
      </Box>
      <Box p={8}>
        <VStack gap={4}>
          
        </VStack>
      </Box>
      <AddCashier isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};

export default CashierManagement;
