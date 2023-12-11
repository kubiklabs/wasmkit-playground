import { Flex, Stack } from "@chakra-ui/react";
import Sheet from "../components/layout/Sheet";
import QueryForm from "../components/query/QueryForm";
import Preview from "../components/containers/Preview";
import Result from "../components/containers/Result";
import { useState } from "react";
import { MsgObject } from "../types/dataTypes";
import { useRecoilValue } from "recoil";
import { networkContracts } from "../context/networkContractState";

const QueryContract = () => {
  const [code, setCode] = useState<MsgObject>({});

  const handleMsgUpdate = (msg: MsgObject) => {
    const newMsg = msg;

    setCode(newMsg);
  };

  return (
    <Sheet gap="10px">
      <Flex height={"100%"} width={"100%"} gap={"40px"}>
        {/* {getChainId()} */}
        <QueryForm flex={1} onMsgChange={handleMsgUpdate} />
        {/* {JSON.stringify(code)} */}
        <Stack gap={"40px"} flex={1}>
          <Preview code={code} />
          <Result />
        </Stack>
      </Flex>
    </Sheet>
  );
};

export default QueryContract;
