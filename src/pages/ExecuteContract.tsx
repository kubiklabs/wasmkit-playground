import { Flex, Stack } from "@chakra-ui/react";
import Sheet from "../components/layout/Sheet";
import Preview from "../components/containers/Preview";
import Result from "../components/containers/Result";
import ExecuteForm from "../components/execute/ExecuteForm";
import { useState } from "react";
import { MsgObject } from "../types/dataTypes";

const ExecuteContract = () => {
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleMsgUpdate = (msg: MsgObject) => {
    const newMsg = JSON.stringify(msg, null, 2);

    setCode(newMsg);
  };

  const handleResultUpdate = (msg: any) => {
    const newMsg = JSON.stringify({ response: msg }, (key, value) => {
      // Check if the value is a BigInt
      if (typeof value === "bigint") {
        // Convert BigInt to string
        return value.toString();
      }
      return value;
    });
    console.log(newMsg);

    setResult(newMsg);
  };
  return (
    <Sheet gap="10px">
      <Flex flexWrap={"wrap"} width={"100%"} gap={"40px"}>
        <ExecuteForm
          onResultChange={handleResultUpdate}
          flex={1}
          onMsgChange={handleMsgUpdate}
        />
        <Stack gap={"40px"} flex={1}>
          <Preview code={code} />
          <Result result={result} />
        </Stack>
      </Flex>
    </Sheet>
  );
};

export default ExecuteContract;
