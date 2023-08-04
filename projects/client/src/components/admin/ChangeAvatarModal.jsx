import {
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import MainButton from "../buttons/MainButton";

const ChangeAvatarModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    currentEmail: Yup.string()
      .email("Invalid email address format")
      .required("Current Email is required"),
    newEmail: Yup.string()
      .email("Invalid email address format")
      .required("New Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.patch(`http://localhost:8000/api//profile/change-email`, {
        currentEmail: values.currentEmail,
        newEmail: values.newEmail,
      });

      alert("Email changed successfully");
    } catch (error) {
      alert("Error changing email");
    }
  };

  const formik = useFormik({
    initialValues: {
      currentEmail: "",
      newEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={700}>
            Change Email
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.currentEmail && formik.errors.currentEmail
              }
            >
              <FormLabel mt={4}>Current Email</FormLabel>
              <Input
                id="currentEmail"
                name="currentEmail"
                type="email"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentEmail}
                focusBorderColor="#C77DFF"
              />
              {formik.touched.currentEmail && formik.errors.currentEmail && (
                <FormErrorMessage>
                  {formik.errors.currentEmail}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.newEmail && formik.errors.newEmail}
            >
              <FormLabel mt={4}>New Email</FormLabel>
              <Input
                id="newEmail"
                name="newEmail"
                type="email"
                rounded={"lg"}
                focusBorderColor="#C77DFF"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newEmail}
              />
              {formik.touched.newEmail && formik.errors.newEmail && (
                <FormErrorMessage>{formik.errors.newEmail}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <MainButton content="Save" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ChangeAvatarModal;