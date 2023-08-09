import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, VStack, Text } from '@chakra-ui/react';

const ProductsSold = ({ transactionId, productsSold, selectedTransactionDate }) => {
  // Filter the productsSold based on the selectedTransactionDate
  const filteredProducts = productsSold.filter(
    (product) => product.transactionDate === selectedTransactionDate
  );

  return (
    <VStack align="flex-start">
      <Text fontSize="lg" fontWeight="bold">
        Products Sold for Transaction: {transactionId}
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product ID</Th>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredProducts.map((product, index) => (
            <Tr key={index}>
              <Td>{product.productId}</Td>
              <Td>{product.Product.name}</Td>
              <Td>{product.totalQuantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ProductsSold;
