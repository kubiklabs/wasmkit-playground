import { Box, Code, Flex, Text } from "@chakra-ui/react";
import ReactJson from "@microlink/react-json-view";

const Result = ({ result }: { result: string | undefined }) => {
  return (
    <Flex
      gap={"10px"}
      flex={"1"}
      flexDirection={"column"}
    >
      <Text
        textAlign={"left"}
        color="#F5F5F5"
        fontSize={{ base: "20px", md: "28px" }}
        fontWeight="600"
        letterSpacing="3.2px"
      >
        Result
      </Text>
      <Code
        fontSize={{ base: "0.8rem", md: "1rem" }}
        textAlign={"left"}
        borderRadius={"10px"}
        height={"100%"}
        padding={{ base: "15px", md: "30px" }}
        bg={"black"}
        overflow={"auto"}
        colorScheme="black"
      >
        {result ? (
          <ReactJson
            collapsed={1}
            style={{ background: "transparent" }}
            theme={"colors"}
            name={false}
            src={JSON.parse(result)}
          />
        ) : (
          "Result will appear here  "
        )}
      </Code>
    </Flex>
  );
};

export default Result;
