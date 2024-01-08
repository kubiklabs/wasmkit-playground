import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const KeyValuePair = ({
  keyName,
  valueName,
}: {
  keyName: string;
  valueName: string;
}) => {
  return (
    <Flex alignItems={{base: "start", md:"center"}} gap={"10px"}>
      <Text
        whiteSpace={"nowrap"}
        fontWeight={"bold"}
        fontSize={{ base: "1rem", md: "1.5rem" }}
      >
        {keyName}{" "}
      </Text>
      <Text wordBreak={{base: "break-word", md: "normal"}} fontSize={{ base: "1rem", md: "1.5rem" }}>{valueName}</Text>
    </Flex>
  );
};

export default KeyValuePair;
