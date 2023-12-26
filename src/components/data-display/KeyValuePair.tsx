import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const KeyValuePair = ({
  keyName,
  valueName,
}: {
  keyName: string;
  valueName: string;
}) => {
  return (
    <Flex alignItems={"center"} gap={"10px"}>
      <Text whiteSpace={"nowrap"} fontWeight={"bold"} fontSize={"1.5rem"}>
        {keyName}{" "}
      </Text>
      <Text fontSize={"1.5rem"}>{valueName}</Text>
    </Flex>
  );
};

export default KeyValuePair;
