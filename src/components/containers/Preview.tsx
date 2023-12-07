import { Code, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Preview = ({ code }: { code: string | object }) => {
  useEffect(() => {
    console.log(code);
    setUpdatedCode(code);
  }, [code]);

  const [updatedCode, setUpdatedCode] = useState(code);

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
        <pre>{JSON.stringify(updatedCode, null, 2)}</pre>
      </Code>
    </Flex>
  );
};

export default Preview;
