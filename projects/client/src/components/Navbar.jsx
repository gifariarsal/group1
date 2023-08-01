import { Avatar, Box, Button, Flex, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../redux/reducer/AuthReducer';
import Logo from "../assets/cashien_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate("/");
  };

  return (
    <header>
      <Box>
        <Flex
          bg={"white"}
          color={"#1c1c1c"}
          minH={"60px"}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"#F9CDA6"}
          align={"center"}
        >
          <Box w={"50%"} my={"16px"} mx={{ base: "24px", lg:"60px" }}>
            <Flex justifyContent={"flex-start"} align={"center"}>
                <Image
                  src={Logo}
                  h={"32px"}
                  _hover={{ filter: "brightness(150%)", transition: "300ms" }}
                />
            </Flex>
          </Box>
          <Box w={"50%"} m={"16px 60px"}>
            <Flex justifyContent={"flex-end"}>
              <Flex alignItems={"center"} ml={10}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} name="User" src={"/profile"} />
                  </MenuButton>
                  <MenuList>
                    <Link to={"/user-profile"}>
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link to={"/change-password"}>
                      <MenuItem>Change Password</MenuItem>
                    </Link>
                    <MenuDivider />
                    <Link onClick={() => handleLogout()}>
                      <MenuItem color={"red"}>Sign Out</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </header>
  );
}

export default Navbar