import { Button } from "@chakra-ui/react";
import React from "react";

const MainButton = (props) => {
  return (
    <Button
      type="submit"
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
      {props.content}
    </Button>
  );
};

export default MainButton;
