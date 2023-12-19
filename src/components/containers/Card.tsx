import { Box } from "@chakra-ui/react";
import React from "react";

const Card = (props: any) => {
  return (
    <Box {...props} bg={"rgba(255, 255, 255, 0.05)"} borderRadius={"10px"}>
      {props.children}
    </Box>
  );
};

export default Card;
