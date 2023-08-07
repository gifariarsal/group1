// components/AddToCartButton.jsx
import { Button } from "@chakra-ui/react";
import axios from "axios";

const AddToCartButton = ({ productId, quantity, harga_produk }) => {
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/cart",
        { productId, quantity, harga_produk },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(( response) => {
        alert("Product added to cart");
      })
      .catch((error) => {
        console.error("Failed to add product to cart", error);
        alert("Failed to add product to cart");
      });
  };

  return (
    <Button colorScheme="teal" onClick={handleAddToCart} mt="3">
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
