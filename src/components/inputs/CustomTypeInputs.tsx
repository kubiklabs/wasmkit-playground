import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface CustomTypeInputProps extends FlexProps {
  type?: string;
}

const CustomTypeInputs = ({ type, ...props }: CustomTypeInputProps) => {
  let children;

  if (type === "string") {
    children = "";
  }

  return <Flex {...props}></Flex>;
};

export default CustomTypeInputs;
