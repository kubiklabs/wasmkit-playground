import { Flex, Stack } from "@chakra-ui/react";
import Sheet from "../components/layout/Sheet";
import QueryForm from "../components/query/QueryForm";
import Preview from "../components/containers/Preview";
import Result from "../components/containers/Result";
import { useState } from "react";
import { MsgObject } from "../types/dataTypes";

const QueryContract = () => {
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string | undefined>("");

  const handleMsgUpdate = (msg: MsgObject) => {
    const newMsg = JSON.stringify(msg, null, 2);

    setCode(newMsg);
  };

  const handleResultUpdate = (msg: any) => {
    let newMsg;
    if (msg) newMsg = JSON.stringify({ response: msg }, null, 2);
    console.log(newMsg);

    setResult(newMsg);
  };

  return (
    <Sheet gap="10px">
      <Flex width={"100%"} gap={"40px"}>
        {/* {getChainId()} */}
        <QueryForm
          onResultChange={handleResultUpdate}
          flex={1}
          onMsgChange={handleMsgUpdate}
        />
        {/* {JSON.stringify(code)} */}
        <Stack gap={"40px"} flex={1}>
          <Preview code={code} />
          <Result result={result} />
        </Stack>
      </Flex>
    </Sheet>
  );
};

export default QueryContract;
