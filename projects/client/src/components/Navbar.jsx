import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../redux/reducer/AuthReducer";
import Logo from "../assets/cashien_logo.png";
import axios from "axios";
import ChangeAvatarModal from "./admin/ChangeAvatarModal";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate("/");
  };
  const [avatar, setAvatar] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOpenAvatar = () => {
    onOpen();
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { imgProfile } = response.data.data;
      setAvatar(imgProfile);
    } catch (error) {
      console.log("error fetching cashier data", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getImageUrl = (imagePath) => {
    return `http://localhost:8000/${imagePath}`;
  };

  return (
    <header>
      <Box>
        <Flex
          pos={"fixed"}
          w={"full"}
          zIndex={10}
          bg={"white"}
          color={"#1c1c1c"}
          minH={"60px"}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"#F9CDA6"}
          align={"center"}
          display={"flex"}
          justifyContent={"space-between"}
          px={"8"}
        >
          <Image
            src={Logo}
            h={"32px"}
            _hover={{ filter: "brightness(150%)", transition: "300ms" }}
          />
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"sm"} name="User" src={getImageUrl(avatar)} />
            </MenuButton>
            <MenuList>
              <Link as={"button"} onClick={onOpenAvatar}>
                <MenuItem>Change Avatar</MenuItem>
              </Link>
              <MenuDivider />
              <Link onClick={() => handleLogout()}>
                <MenuItem color={"red"}>Sign Out</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      <ChangeAvatarModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </header>
  );
};

export default Navbar;
