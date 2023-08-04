import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Image,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import UpdateProductModal from "./UpdateProductModal";
import CreateProductModal from "./CreateProductModal";
import SortAlphabetical from "./SortAlphabetical";
import SortPrice from "./SortPrice";

const API_URL = "http://localhost:8000/api/product";
const CATEGORY_URL = "http://localhost:8000/api/category";
const PUBLIC_URL = "http://localhost:8000";
const PRODUCTS_PER_PAGE = 10;

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortAlphabetical, setSortAlphabetical] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterProductName, setFilterProductName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, filterCategory, filterProductName, sortAlphabetical, sortPrice]);

  const fetchProducts = async () => {
    try {
      let queryParams = {
        size: PRODUCTS_PER_PAGE,
        page: currentPage || 2,
      };
      if (filterCategory && filterCategory !== "All") {
        queryParams.categoryId = filterCategory;
      }
      if (filterProductName) {
        queryParams.name = filterProductName;
      }
      if (sortAlphabetical) {
        queryParams.sort_name = sortAlphabetical;
      }
      if (sortPrice) {
        queryParams.sort_Harga = sortPrice;
      }
  
      const response = await axios.get(API_URL, {
        params: queryParams,
      });
  
      setProducts(response.data.data);
  
      // Update the totalPages based on the response headers
      const totalPagesFromHeaders = Number(response.headers["total-pages"]);
      setTotalPages(totalPagesFromHeaders);
  
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch products.");
      setLoading(false);
    }
  };
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_URL);
      const activeCategories = response.data.data.filter(
        (category) => category.isActive
      );
      setCategories(activeCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenUpdateModal = (product) => {
    setSelectedProduct(product);
    onUpdateModalOpen();
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/deactivate`);
      // Refresh the product list after successful deactivation
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivate = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/activate`);
      // Refresh the product list after successful activation
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductUpdate = async (updatedProduct) => {
    try {
      await axios.patch(`${API_URL}/${updatedProduct.id}`, updatedProduct);
      // Refresh the product list after successful update
      fetchProducts();
      onUpdateModalClose(); // Close the update modal after update
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductCreate = async (createdProduct) => {
    try {
      // Add the newly created product to the products list
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      onCreateModalClose(); // Close the create modal after create
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortAlphabetical = async (type) => {
    // Function to handle sorting products alphabetically
    setSortAlphabetical(type);
    setSortPrice(""); // Reset sortPrice to empty
    try {
      // Perform sorting based on type (asc or desc)
      const response = await axios.get(API_URL, {
        params: {
          sort_name: type === "asc" ? "asc" : type === "desc" ? "desc" : null,
          category: filterCategory,
          name: filterProductName,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortPrice = async (type) => {
    // Function to handle sorting products by price
    setSortPrice(type);
    setSortAlphabetical(""); // Reset sortAlphabetical to empty
    try {
      // Perform sorting based on type (asc or desc)
      const response = await axios.get(API_URL, {
        params: {
          sort_Harga: type === "asc" ? "asc" : type === "desc" ? "desc" : null,
          category: filterCategory,
          name: filterProductName,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, ));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, ));
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Center>
    );
  }

  const getImageUrl = (imagePath) => {
    return `${PUBLIC_URL}/${imagePath}`;
  };

  // Membuat array berisi angka halaman dari 1 hingga totalPages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box maxW="800px" mx="auto" mt="20px">
      <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="20px">
        Product List
      </Text>
      <Button colorScheme="blue" mb="10px" onClick={onCreateModalOpen}>
        Create New Product
      </Button>

      {/* Sort by Alphabetical */}
      <Text mt="2" fontWeight="bold">
        Sort by Alphabetical:
      </Text>
      <SortAlphabetical
        sortType={sortAlphabetical}
        onSort={handleSortAlphabetical}
      />

      {/* Sort by Price */}
      <Text mt="2" fontWeight="bold">
        Sort by Price:
      </Text>
      <SortPrice sortType={sortPrice} onSort={handleSortPrice} />

      {/* Filter by Category */}
      <Text mt="2" fontWeight="bold">
        Filter by Category:
      </Text>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Filter by Product Name */}
      <Text mt="2" fontWeight="bold">
        Filter by Product Name:
      </Text>
      <input
        type="text"
        value={filterProductName}
        onChange={(e) => setFilterProductName(e.target.value)}
        placeholder="Enter product name..."
      />

      <Button colorScheme="teal" onClick={handleFilter}>
        Filter
      </Button>

      <Flex mt="4" justify="center">
        <Button
          colorScheme="teal"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          mr="2"
        >
          Previous
        </Button>
        {pageNumbers.map((page) => (
          <Button
            key={page}
            colorScheme="teal"
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
            mr="2"
          >
            {page}
          </Button>
        ))}
        <Button
          colorScheme="teal"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          ml="2"
        >
          Next
        </Button>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {products.map((product) => (
          <GridItem key={product.id}>
            <Box borderWidth="1px" borderRadius="lg" p="10px">
              <Text fontWeight="bold" fontSize="xl" mb="2">
                {product.name}
              </Text>
              <Image
                src={getImageUrl(product.productImg)}
                alt={product.name}
                width="100%"
                maxHeight="200px"
                objectFit="cover"
                mb="2"
              />
              <Text>Category: {product.Category?.name}</Text>
              <Text>Price: {product.harga_produk}</Text>
              <Flex mt="2">
                <Button
                  colorScheme="blue"
                  mr="2"
                  onClick={() => handleDeactivate(product.id)}
                  isDisabled={!product.isActive}
                >
                  Deactivate
                </Button>
                <Button
                  colorScheme="green"
                  mr="2"
                  onClick={() => handleActivate(product.id)}
                  isDisabled={product.isActive}
                >
                  Activate
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={() => handleOpenUpdateModal(product)}
                >
                  Update
                </Button>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Modal for updating product */}
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={onUpdateModalClose}
        selectedProduct={selectedProduct}
        onUpdate={handleProductUpdate}
      />

      {/* Modal for creating product */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        onCreate={handleProductCreate}
      />
    </Box>
  );
};

export default ListProduct;
