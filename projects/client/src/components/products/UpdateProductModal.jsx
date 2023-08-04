// UpdateProductModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const UpdateProductModal = ({ isOpen, onClose, selectedProduct, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: selectedProduct?.name || "",
    categoryId: selectedProduct?.categoryId || "",
    modal_produk: selectedProduct?.modal_produk || "",
    harga_produk: selectedProduct?.harga_produk || "",
    quantity: selectedProduct?.quantity || "",
    description: selectedProduct?.description || "",
    productImg: null, // Store the uploaded image file
  });

  const toast = useToast(); // Initialize useToast hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, productImg: file });
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("categoryId", formData.categoryId);
      formDataObj.append("modal_produk", formData.modal_produk);
      formDataObj.append("harga_produk", formData.harga_produk);
      formDataObj.append("quantity", formData.quantity);
      formDataObj.append("description", formData.description);
      if (formData.productImg) {
        formDataObj.append("productImg", formData.productImg);
      }

      const updatedProduct = await axios.patch(
        `http://localhost:8000/api/product/${selectedProduct.id}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (updatedProduct.status === 200) {
        // Product updated successfully
        // You can do any additional actions or update the product list
        if (typeof onProductUpdated === "function") {
          onProductUpdated(updatedProduct.data.data);
        }
        onClose(); // Close the modal after successful update
        toast({
          title: "Product Updated",
          description: "The product has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle error if necessary
        toast({
          title: "Product Failed to Update",
          description: "The product could not be updated.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("Failed to update product");
      }
    } catch (error) {
      toast({
        title: "Product Failed to Update",
        description: "The product could not be updated.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Category ID</FormLabel>
            <Input
              type="text"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Modal Produk</FormLabel>
            <Input
              type="text"
              name="modal_produk"
              value={formData.modal_produk}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Harga Produk</FormLabel>
            <Input
              type="text"
              name="harga_produk"
              value={formData.harga_produk}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Product Image</FormLabel>
            <Input type="file" name="productImg" onChange={handleImageChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="teal" onClick={handleUpdateProduct}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProductModal;
