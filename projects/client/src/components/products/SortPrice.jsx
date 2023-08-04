import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";

const SortPrice = ({ sortType, onSort }) => {
  return (
    <ButtonGroup spacing={4}>
      <Button colorScheme={sortType === "asc" ? "blue" : "gray"} onClick={() => onSort("asc")}>
        Ascending
      </Button>
      <Button colorScheme={sortType === "desc" ? "blue" : "gray"} onClick={() => onSort("desc")}>
        Descending
      </Button>
    </ButtonGroup>
  );
};

export default SortPrice;
