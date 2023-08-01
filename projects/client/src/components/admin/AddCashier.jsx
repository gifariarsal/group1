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
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const AddCashier = ({ isOpen, onClose }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
            <FormControl
              isRequired
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel mt={4}>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  _placeholder={{
                    fontSize: "xs",
                    color: "gray.500",
                  }}
                  rounded={"lg"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement width="3.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? (
                      <IoEyeOffOutline size={"20px"} />
                    ) : (
                      <IoEyeOutline size={"20px"} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
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

export default AddCashier;
