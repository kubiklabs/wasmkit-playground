import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AddInput = (props: FlexProps) => {
  return (
    <Flex
      _hover={{
        bg: "rgba(255, 255, 255, 0.15)",
      }}
      cursor={"pointer"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"10px"}
      p={"10px 20px"}
      border={"1px solid #A9DFD8"}
      borderRadius={"5px"}
      {...props}
    >
      <Text>{props.content}</Text>
      <FontAwesomeIcon icon={faCirclePlus} />{" "}
    </Flex>
  );
};

export default AddInput;
