import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { makeCategory } from "../../redux/reducer/CategoryReducer";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const login = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if (!login) {
        navigate("/sign-in");
      }
    }, [login, navigate]);

    if (!login) {
      return null;
    }

    return <Component {...props} />;
  };
}

const CreateCategory = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/category");
      console.log(res);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      isActive: document.getElementById("isActive").value === "true",
    };
    dispatch(makeCategory(data));
  };

  return (
    <Box maxW="lg" mx="auto" p={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Create Category
        </Text>
        <FormControl id="name" isRequired>
          <FormLabel>Name Category</FormLabel>
          <Input
            type="text"
            name="name"
            rounded="lg"
            placeholder="Name Category"
            borderColor={"red.500"}
          />
        </FormControl>
        <FormControl id="isActive" isRequired>
          <FormLabel>isActive</FormLabel>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            rounded="lg"
            borderColor={"red.500"}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </Select>
        </FormControl>
        <Button
          type="submit"
          onClick={handleSubmit}
          display={"flex"}
          justifyContent={"center"}
          w={"100%"}
          mt={"6"}
          rounded={"lg"}
          color={"white"}
          bgColor={"#C1600C"}
          _hover={{ bgColor: "#EC8D3C" }}
          _active={{ bgColor: "#88450B" }}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default withAuth(CreateCategory);
