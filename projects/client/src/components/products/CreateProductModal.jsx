// CreateProductModal.jsx
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

const CreateProductModal = ({ isOpen, onClose, onCreateSuccess }) => {
  const toast = useToast(); // Initialize useToast hook

  const initialFormData = {
    name: "",
    categoryId: "",
    modal_produk: "",
    harga_produk: "",
    quantity: "",
    description: "",
    productImg: null, // Store the uploaded image file
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, productImg: file });
  };

  const handleCreateProduct = async () => {
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

      const createdProduct = await axios.post(
        "http://localhost:8000/api/product",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (createdProduct.status === 200) {
        // Product created successfully
        // You can do any additional actions or update the product list
        if (typeof onCreateSuccess === "function") {
          onCreateSuccess(createdProduct.data.data);
        }
        setFormData(initialFormData); // Reset the form data
        onClose(); // Close the modal
        toast({
          title: "Product Created",
          description: "The product has been created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle error if necessary
        toast({
          title: "Product Failed to Create",
          description: "The product could not be created.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("Failed to create product");
      }
    } catch (error) {
      // Handle error if necessary
      toast({
        title: "Product Failed to Create",
        description: "The product could not be created.",
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
        <ModalHeader>Create Product</ModalHeader>
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
          <Button colorScheme="teal" onClick={handleCreateProduct}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;
