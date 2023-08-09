import React, { useState } from "react";
import {
  Button,
  Container,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import ProductsSold from "./ProductsSold";
import SalesChart from "./SalesChart";

const SalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [productsSold, setProductsSold] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const generateReport = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/daily?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setReportData(data.data);
      setSelectedTransactionId(null);

      const salesTotal = data.data.reduce(
        (total, row) => total + parseInt(row.totalPrice, 10),
        0
      );
      setTotalSales(salesTotal);
    } catch (error) {
      console.error("Error fetching sales report:", error);
    }
  };

  const fetchProductsSold = async (transactionId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/sold?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      if (data.productSold && data.productSold.length > 0) {
        setProductsSold(data.productSold);
        setSelectedTransactionId(transactionId);
      } else {
        // Handle the case when no products are sold for the transaction
        setProductsSold([]);
        setSelectedTransactionId(null);
      }
    } catch (error) {
      console.error("Error fetching products sold:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Function to handle click on "View Products Sold" button
  const handleViewProductsSold = (transactionId) => {
    fetchProductsSold(transactionId);
  };

  return (
    <>
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
              Sales Report
            </Text>
          </Box>
        </Box>
        <Box w={"full"} display={"flex"} justifyContent={"center"}>
          <SalesChart />
        </Box>
        <Box py={10} px={40} w={"full"} minH={"100vh"}>
        <Text fontSize={"2xl"} fontWeight={600} mb={4}>Sales Report by Date Range</Text>
          <VStack spacing="4" mb={10}>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button
              colorScheme="orange"
              onClick={generateReport}
              isDisabled={startDate === "" || endDate === ""}
            >
              Generate Report
            </Button>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Transaction Date</Th>
                  <Th>Total Price</Th>
                  <Th>View All Products</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reportData.length === 0 ? (
                  <Tr>
                    <Td colSpan={3}>
                      {startDate && endDate
                        ? "No sales data available for the selected date range."
                        : "Please select a start and end date."}
                    </Td>
                  </Tr>
                ) : (
                  reportData.map((row, index) => (
                    <Tr key={index}>
                      <Td>{row.transactionDate}</Td>
                      <Td>{formatCurrency(row.totalPrice)}</Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="orange"
                          onClick={() => handleViewProductsSold(row.id)}
                        >
                          View Products Sold
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
            {reportData.length > 0 && (
              <Text fontSize="lg" fontWeight="bold">
                Total Sales: {formatCurrency(totalSales)}
              </Text>
            )}
          </VStack>
          {selectedTransactionId !== null && (
            <ProductsSold
              transactionId={selectedTransactionId}
              productsSold={productsSold}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default SalesReport;
