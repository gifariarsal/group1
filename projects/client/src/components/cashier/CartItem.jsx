// components/CartItem.jsx
import { Box, Text } from "@chakra-ui/react";

const CartItem = ({ item }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="3" mb="3" bg={"white"}>
      <Text fontWeight="bold">{item.Product.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Total Price: Rp {item.price}</Text>
    </Box>
  );
};

export default CartItem;
