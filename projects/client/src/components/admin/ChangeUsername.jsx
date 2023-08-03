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

const ChangeUsernameModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    currentUsername: Yup.string().required("Current Username is required"),
    newUsername: Yup.string().required("New Username is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.patch(`http://localhost:8000/api//profile/change-username`, {
        currentUsername: values.currentUsername,
        newUsername: values.newUsername,
        },
      );
      alert("Username changed successfully");
    } catch (error) {
      alert("Error changing username:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      currentUsername: "",
      newUsername: "",
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
          <Text fontSize={"2xl"} fontWeight={700}>
            Change Username
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.currentUsername && formik.errors.currentUsername
              }
            >
              <FormLabel mt={4}>Current Username</FormLabel>
              <Input
                id="currentUsername"
                name="currentUsername"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentUsername}
                focusBorderColor="#C77DFF"
              />
              {formik.touched.currentUsername &&
                formik.errors.currentUsername && (
                  <FormErrorMessage>
                    {formik.errors.currentUsername}
                  </FormErrorMessage>
                )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.newUsername && formik.errors.newUsername
              }
            >
              <FormLabel mt={4}>New Username</FormLabel>
              <Input
                id="newUsername"
                name="newUsername"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newUsername}
                focusBorderColor="#C77DFF"
              />
              {formik.touched.newUsername && formik.errors.newUsername && (
                <FormErrorMessage>{formik.errors.newUsername}</FormErrorMessage>
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

export default ChangeUsernameModal;
