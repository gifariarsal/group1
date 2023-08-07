import { Box, Button, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:8000/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data.cartItems);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:8000/api/payment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const data = await response.json();
      alert(data.message);

      // Refresh cart items after checkout
      fetchCartItems();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Calculate total price dynamically based on cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price ,
    0
  );

  return (
    <Box p="4">
      <Heading as="h1" mb="4">
        Transaction Cart
      </Heading>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <Box fontWeight="bold"  p={4} bg={"green"} color={"white"} borderRadius={15}>Total Price: Rp {totalPrice}</Box>
      <Button mt="4" colorScheme="blue" onClick={handleCheckout}>
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;
