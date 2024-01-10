import { Code, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MsgObject } from "../../types/dataTypes";
import ReactJson from "@microlink/react-json-view";

const Preview = ({ code }: { code: string }) => {
  return (
    <Flex gap={"10px"} flex={"1"} flexDirection={"column"}>
      <Text
        color="#F5F5F5"
        fontSize={{ base: "20px", md: "28px" }}
        fontWeight="600"
        letterSpacing="3.2px"
        textAlign={"left"}
      >
        Preview
      </Text>
      <Code
        fontSize={{ base: "0.8rem", md: "1rem" }}
        padding={{ base: "15px", md: "30px" }}
        textAlign={"left"}
        borderRadius={"10px"}
        height={"100%"}
        bg={"black"}
        overflow={"auto"}
        colorScheme="black"
      >
        {code && (
          <ReactJson
            displayDataTypes={false}
            theme={"colors"}
            style={{ background: "transparent" }}
            name={false}
            src={JSON.parse(code)}
          />
        )}
      </Code>
    </Flex>
  );
};

export default Preview;
