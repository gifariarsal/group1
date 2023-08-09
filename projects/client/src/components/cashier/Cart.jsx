import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItemPrice, settotalItemPrice] = useState();
  const [amountPaid, setAmountPaid] = useState(); // State to store the amount paid by the customer
  const [change, setChange] = useState(0); // State to store the calculated change

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:8000/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:8000/api/payment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const data = await response.json();
      alert(data.message);

      // Refresh cart items after checkout
      fetchCartItems();
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => (total + (item.price*item.quantity) ), 0);

  // Function to handle the amount entered by the cashier and calculate the change
  const handleAmountPaidChange = (event) => {
    const amountEntered = Number(event.target.value);
    setAmountPaid(amountEntered);

    // Calculate the change
    const changeAmount = amountEntered - totalPrice;
    setChange(changeAmount);
  };

  const handleItemRemoved = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/cart/${itemId}`
      );
      if (response.status === 200) {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        alert("Item removed");
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Failed to remove item:", error.message);
    }
  };

  const handleItemUpdated = (updatedItem) => {
    // Update the cart items state with the updated item
    const updatedCartItems = cartItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setCartItems(updatedCartItems);
    // Recalculate total price based on the updated cart items
    const updatedTotalPrice = updatedCartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    settotalItemPrice(updatedTotalPrice);
  };

  return (
    <Box p="4">
      <Heading as="h1" mb="4" color={"white"}>
        Transaction Cart
      </Heading>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} onItemUpdated={setCartItems}  onItemRemoved={handleItemRemoved} totalItemPrice={totalItemPrice}  />
      ))}
      <Box
        fontWeight="bold"
        p={4}
        bg={"green"}
        color={"white"}
        borderRadius={15}
      >
        Total Price: Rp {totalPrice}
      </Box>
      <Box mt={4}>
        <Flex mb={4}>
          <FormControl>
            <FormLabel color={"white"} htmlFor="amountPaid">Amount Paid:</FormLabel>
            <Input
              bgColor={"white"}
              h={14}
              color={"black"}
              fontSize={"lg"}
              type="number"
              id="amountPaid"
              rounded={"xl"}
              value={amountPaid}
              onChange={handleAmountPaidChange}
              placeholder="Enter amount paid by the customer"
            />
          </FormControl>
        </Flex>
      </Box>
      <Box
        fontWeight="bold"
        p={4}
        bg={"teal"}
        color={"white"}
        borderRadius={15}
      >
        Change: Rp {change >= "" ? change : "Insufficient amount"}
      </Box>
      <Button w={"full"} h={12} rounded={"xl"} mt="10" colorScheme="orange" onClick={handleCheckout}>
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;
