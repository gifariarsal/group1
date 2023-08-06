import * as Yup from "yup";
import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import MainButton from "./buttons/MainButton";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const forgotPass = async (values) => {
    try {
      await axios.put(
        "http://localhost:8000/api/auth/forgot-password",
        {
          email: values.email,
        }
      );

      alert("Reset password link has been sent successfully");
    } catch (error) {
      alert("Error sending password reset email:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      forgotPass(values);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"2xl"} fontWeight={700}>
            Forgot your password?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Text fontSize={"sm"} mb={4} fontWeight={400} color={"gray.600"}>
              Enter the email address you used when you joined and we'll send
              you a link to reset your password.
            </Text>

            <FormControl
              isRequired
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <Input
                id="email"
                name="email"
                type="email"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                focusBorderColor="#C77DFF"
                placeholder="yours@email.com"
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
              />
              {formik.touched.email && formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <MainButton content="Send Request" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;
