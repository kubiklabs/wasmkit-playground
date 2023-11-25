import { Box, Code, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Preview = () => {
  return (
    <Flex flex={"1"} flexDirection={"column"}>
      <Text
        color="#F5F5F5"
        fontSize="32px"
        fontWeight="600"
        letterSpacing="3.2px"
      >
        Preview
      </Text>
      <Code
        textAlign={"left"}
        borderRadius={"10px"}
        height={"100%"}
        padding={"40px"}
        bg={"black"}
        overflow={"auto"}
        colorScheme="black"
      >
        {`{\n\n
            \ngetCount:{}
        }`}
      </Code>
    </Flex>
  );
};

export default Preview;
