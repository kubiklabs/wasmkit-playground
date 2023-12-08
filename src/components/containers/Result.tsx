import { Box, Code, Flex, Text } from "@chakra-ui/react";

const Result = () => {
  return (
    <Flex flex={"1"} flexDirection={"column"}>
      <Text
        textAlign={"left"}
        color="#F5F5F5"
        fontSize="32px"
        fontWeight="600"
        letterSpacing="3.2px"
      >
        Result
      </Text>
      <Code
        textAlign={"left"}
        borderRadius={"10px"}
        height={"100%"}
        padding={"40px"}
        bg={"rgba(255, 255, 255, 0.05)"}
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

export default Result;
