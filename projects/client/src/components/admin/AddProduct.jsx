import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import MainButton from "../buttons/MainButton";
import { useFormik } from "formik";

const AddProduct = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const addCashier = async (values) => {
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      console.log("Cashier created successfully");
    } catch (err) {
      console.log("Failed to create cashier");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      addCashier(values);
      onClose();
      resetForm();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={700}>
            Create New Cashier
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={formik.touched.username && formik.errors.username}
            >
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <FormLabel mt={4}>Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <MainButton content="Create Cashier" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;