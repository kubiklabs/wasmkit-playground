import { Flex, Stack } from "@chakra-ui/react";
import Sheet from "../components/layout/Sheet";
import QueryForm from "../components/query/QueryForm";
import Preview from "../components/containers/Preview";
import Result from "../components/containers/Result";
import { useChainInfo } from "../hooks/useChainInfo";
import { useNetworkConfig } from "../hooks/useNetworkConfig";
import { useRecoilValue } from "recoil";
import { networkContracts } from "../context/networkContractState.";

const QueryContract = () => {
  const data = useRecoilValue(networkContracts);
  console.log(data);

  // const { getChainId } = useChainInfo("uni-6");
  return (
    <Sheet gap="10px">
      <Flex height={"100%"} width={"100%"} gap={"40px"}>
        {/* {getChainId()} */}
        <Stack gap={"40px"} flex={1}>
          <QueryForm />
          <Result />
        </Stack>
        <Preview />
      </Flex>
    </Sheet>
  );
};

export default QueryContract;
