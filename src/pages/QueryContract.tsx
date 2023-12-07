import { Flex, Stack } from "@chakra-ui/react";
import Sheet from "../components/layout/Sheet";
import QueryForm from "../components/query/QueryForm";
import Preview from "../components/containers/Preview";
import Result from "../components/containers/Result";
import { useState } from "react";
import { MsgObject } from "../types/dataTypes";

const QueryContract = () => {
  const [previewMsg, setPreviewMsg] = useState<MsgObject>({});

  const handleMsgUpdate = (msg: MsgObject) => {
    console.log(msg);

    setPreviewMsg(msg);
  };

  return (
    <Sheet gap="10px">
      <Flex height={"100%"} width={"100%"} gap={"40px"}>
        {/* {getChainId()} */}
        <Stack gap={"40px"} flex={1}>
          <QueryForm onMsgChange={handleMsgUpdate} />
          <Result />
        </Stack>
        <Preview code={previewMsg} />
      </Flex>
    </Sheet>
  );
};

export default QueryContract;
