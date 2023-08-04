import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddCashier from "./AddCashier";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCashier } from "../../redux/reducer/UserReducer";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangeUsernameModal from "./ChangeUsername";

const CashierManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const cashierList = useSelector((state) => state.UserReducer.cashier);
  const showAvatarColumn = useBreakpointValue({ base: false, md: true });

  const {
    isOpen: isOpenUsername,
    onOpen: onOpenUsername,
    onClose: onCloseUsername,
  } = useDisclosure();

  const {
    isOpen: isOpenEmail,
    onOpen: onOpenEmail,
    onClose: onCloseEmail,
  } = useDisclosure();

  const onUsernameChange = () => {
    onOpenUsername();
  };
  const onEmailChange = () => {
    onOpenEmail();
  };

  useEffect(() => {
    fetchCashier();
  }, []);

  const fetchCashier = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/cashier");
      dispatch(setCashier(response.data.data));
    } catch (error) {
      console.log("error fetching cashier data", error);
    }
  };

  const deactiveCashier = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/cashier/deactivate?id=${id}`);
      alert(res.data.message);
      fetchCashier();
    } catch (err) {
      alert(err);
    }
  };

  const activeCashier = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/cashier/activate?id=${id}`);
      alert(res.data.message);
      fetchCashier();
    } catch (err) {
      alert(err);
    }
  };

  const onCreate = () => {
    onOpen();
  };

  return (
    <Box w={"full"} minH={"100vh"}>
      <Box
        h={"62px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"#A2AABA"}
        py={4}
        px={8}
      >
        <Box>
          <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight={"medium"}>
            Cashier Management
          </Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              variant={"solid"}
              cursor={"pointer"}
              bg={"white"}
              rounded={"lg"}
              border={"1px"}
              borderColor={"#D27321"}
            >
              Edit Cashier
            </MenuButton>
            <MenuList w={{ md: "50px", lg: "100px" }}>
              <Button
                variant={"unstyled"}
                w={"full"}
                onClick={onUsernameChange}
              >
                <MenuItem>Change Username</MenuItem>
              </Button>
              <Button variant={"unstyled"} w={"full"} onClick={onEmailChange}>
                <MenuItem>Change Email</MenuItem>
              </Button>
            </MenuList>
          </Menu>
          <Button
            onClick={onCreate}
            gap={2}
            rounded={"lg"}
            bg={"#D27321"}
            ml={4}
            color={"white"}
            _hover={{ bg: "#E38C41" }}
          >
            <IoAddOutline size={24} />
            Add Cashier
          </Button>
        </Box>
      </Box>
      <Box p={4} w={"full"} minH={"100vh"}>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              {showAvatarColumn && <Th>Avatar</Th>}
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cashierList.map((cashier) => (
              <Tr key={cashier.id}>
                {showAvatarColumn && (
                  <Td>
                    <Avatar
                      size={"sm"}
                      name={cashier.username}
                      src={cashier.imgProfile}
                    />
                  </Td>
                )}
                <Td>{cashier.username}</Td>
                <Td>{cashier.email}</Td>
                <Td>
                  {cashier.isActive ? (
                    <Button
                      colorScheme="green"
                      size={"xs"}
                      onClick={() => deactiveCashier(cashier.id)}
                    >
                      Active
                    </Button>
                  ) : (
                    <Button
                      colorScheme="red"
                      size={"xs"}
                      onClick={() => activeCashier(cashier.id)}
                    >
                      Inactive
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <AddCashier isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <ChangeEmailModal
        isOpen={isOpenEmail}
        onOpen={onOpenEmail}
        onClose={onCloseEmail}
      />
      <ChangeUsernameModal
        isOpen={isOpenUsername}
        onOpen={onOpenUsername}
        onClose={onCloseUsername}
      />
    </Box>
  );
};

export default CashierManagement;