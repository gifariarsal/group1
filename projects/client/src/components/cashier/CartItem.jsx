import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios"; // Import axios to make API requests

const CartItem = ({ item, onItemUpdated, onItemRemoved, totalItemPrice }) => {
  const removeItem = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/items/${item.id}`);
      if (response.status === 200) {
        onItemRemoved(item.id);
        alert("Item removed");
        window.location.reload(); 
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Failed to remove item:", error.message);
    }
  };

  const handleIncrement = () => {
    // Increment quantity and update the cart item in the backend
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    updateCartItem(updatedItem);
    window.location.reload();
  };

  const handleDecrement = () => {
    // Decrement quantity and update the cart item in the backend
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      updateCartItem(updatedItem);
      window.location.reload();
    }
  };

  const updateCartItem = async (updatedItem) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/items/${item.id}`,
        { quantity: updatedItem.quantity }
      );

      if (response.status === 200) {
        // Update the cart item in the frontend after successful update in the backend
        onItemUpdated(updatedItem);
      } else {
        throw new Error("Failed to update item quantity");
      }
    } catch (error) {
      console.error("Failed to update item quantity:", error.message);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p="3" mb="3" bg={"white"}>
      <Text fontWeight="bold">{item.Product.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Flex mt="2">
        <Button onClick={handleDecrement} mr="2">
          -
        </Button>
        <Button onClick={handleIncrement}>+</Button>
      </Flex>
      <Text>Total Price: Rp {item.price*item.quantity}</Text>
      <Button onClick={removeItem}>Remove</Button>
    </Box>
  );
};

export default CartItem;
