import {
  Button,
  FormControl,
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
import React, { useState } from "react";

const ChangeAvatarModal = ({ isOpen, onClose }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  const handleSave = async () => {
    if (!profilePhoto) {
      console.log("No profile photo selected.");
      return;
    }

    const formData = new FormData();
    formData.append("imgProfile", profilePhoto);
    const token = localStorage.getItem("token");
    try {
      await axios.patch("http://localhost:8000/api/profile/change-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // onSave(profilePhoto)
      alert("Successfully updated profile photo!")
      window.location.reload();
      onClose();
    } catch (error) {
      alert("Failed to update profile photo!");
      console.log("Error uploading profile photo:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={700}>
            Change Avatar
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Upload Photo</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSave}
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
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeAvatarModal;