import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";

const SortAlphabetical = ({ sortType, onSort }) => {
  return (
    <ButtonGroup spacing={4}>
      <Button colorScheme={sortType === "asc" ? "orange" : "gray"} onClick={() => onSort("asc")}>
        A-Z
      </Button>
      <Button colorScheme={sortType === "desc" ? "orange" : "gray"} onClick={() => onSort("desc")}>
        Z-A
      </Button>
    </ButtonGroup>
  );
};

export default SortAlphabetical;
