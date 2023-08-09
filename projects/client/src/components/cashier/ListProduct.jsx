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
  Input,
  useToast,
} from "@chakra-ui/react";

import SortAlphabetical from "../products/SortAlphabetical";
import SortPrice from "../products/SortPrice";
import AddToCartButton from "./AddToCartButton";


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

const toast = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [
    currentPage,
    filterCategory,
    filterProductName,
    sortAlphabetical,
    sortPrice,
  ]);

  const fetchProducts = async () => {
    try {
      let queryParams = {
        size: PRODUCTS_PER_PAGE,
        page: currentPage || 2,
        isActive: true,
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
      
      const activeProducts = response.data.data.filter((product) => product.isActive);
      setProducts(activeProducts);
      // setProducts(response.data.data);

      // Update the totalPages based on the response headers
      const totalPagesFromHeaders = Number(response.headers["total-pages"]);
      setTotalPages(totalPagesFromHeaders);

      setLoading(false);
    } catch (error) {
      
      toast({
        title: "Products Not Found",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 1000,
      })
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
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 2));
  };

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Product added to cart");
        // Refresh cart items after adding to cart using the function from props
        // fetchCartItems();
      })
      .catch((error) => {
        console.error("Failed to add product to cart", error);
        alert("Failed to add product to cart");
      });
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
    <Box maxW="800px" mx="auto" mt="20px" p="20px">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb="20px">
        Product List
      </Text>
      <Flex>
        <Box w="50%">
          {/* Sort by Alphabetical */}
          <Text mt="2" fontWeight="bold">
            Sort by Alphabetical:
          </Text>
          <SortAlphabetical
            sortType={sortAlphabetical}
            onSort={handleSortAlphabetical}
          />
        </Box>
        <Box w="50%" ml={5}>
          {/* Sort by Price */}
          <Text mt="2" fontWeight="bold">
            Sort by Price:
          </Text>
          <SortPrice sortType={sortPrice} onSort={handleSortPrice} />
        </Box>
      </Flex>
      <Flex mt={5}>
        <Box w="50%">
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
        </Box>
        <Box w="50%" ml={5}>
          {/* Filter by Product Name */}
          <Text mt="2" fontWeight="bold">
            Filter by Product Name:
          </Text>
          <Flex>
            <Input
              type="text"
              rounded={"lg"}
              value={filterProductName}
              onChange={(e) => setFilterProductName(e.target.value)}
              placeholder="Enter product name..."
            />
            <Button
              colorScheme="orange"
              onClick={handleFilter}
              ml={2}
              size="sm"
              mt={1}
            >
              Filter
            </Button>
          </Flex>
        </Box>
      </Flex>

      <Flex mt="10" justify="center">
        <Button
          colorScheme="orange"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          mr="2"
          size="sm"
        >
          Previous
        </Button>
        {pageNumbers.map((page) => (
          <Button
            key={page}
            colorScheme="orange"
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
            mr="2"
            size="sm"
          >
            {page}
          </Button>
        ))}
        <Button
          colorScheme="orange"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          ml="2"
          mb={2}
          size="sm"
        >
          Next
        </Button>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={5}>
        {products.map((product) => (
          <GridItem key={product.id}>
            <Box
              borderWidth="2px"
              borderRadius="xl"
              p="10px"
              bg="white"
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-7px)", color: "teal" }}
            >
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
              <AddToCartButton
                productId={product.id}
                quantity={product.quantity}
                harga_produk={product.harga_produk}
              />
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ListProduct;
