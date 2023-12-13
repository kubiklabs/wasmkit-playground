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
    const newMsg = JSON.stringify(msg);
    console.log(newMsg);

    setResult(newMsg);
  };
  return (
    <Sheet gap="10px">
      <Flex flexWrap={"wrap"} height={"100%"} width={"100%"} gap={"40px"}>
        <ExecuteForm flex={1} onMsgChange={handleMsgUpdate} />
        <Stack gap={"40px"} flex={1}>
          <Preview code={code} />
          <Result result={result} />
        </Stack>
      </Flex>
    </Sheet>
  );
};

export default ExecuteContract;
