import { Box, Code, Flex, Text } from "@chakra-ui/react";
import ReactJson from "@microlink/react-json-view";

const Result = ({ result }: { result: string }) => {
  return (
    <Flex gap={"10px"} flex={"1"} flexDirection={"column"}>
      <Text
        textAlign={"left"}
        color="#F5F5F5"
        fontSize="28px"
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
        {result && (
          <ReactJson
            style={{ background: "transparent" }}
            theme={"colors"}
            name={false}
            src={JSON.parse(result)}
          />
        )}
      </Code>
    </Flex>
  );
};

export default Result;
