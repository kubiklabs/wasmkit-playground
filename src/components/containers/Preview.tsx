import { Code, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MsgObject } from "../../types/dataTypes";
import ReactJson from "@microlink/react-json-view";

const Preview = ({ code }: { code: string }) => {
  // useEffect(() => {
  //   const message = JSON.stringify(code, null, 2);
  //   setUpdatedCode(message);
  //   // console.log(message);
  // }, [code]);

  // const [updatedCode, setUpdatedCode] = useState("");
  // const message = JSON.stringify(code, null, 2);

  return (
    <Flex gap={"10px"} flex={"1"} flexDirection={"column"}>
      <Text
        color="#F5F5F5"
        fontSize="28px"
        fontWeight="600"
        letterSpacing="3.2px"
        textAlign={"left"}
      >
        {/* {updatedCode} */}
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
