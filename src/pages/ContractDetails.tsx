import { useParams } from "react-router-dom";
import Sheet from "../components/layout/Sheet";
import { useEffect, useState } from "react";
import { useReadConfig } from "../hooks/useReadConfig";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { useRecoilValue } from "recoil";
import { networkContracts } from "../context/networkContractState";
import KeyValuePair from "../components/data-display/KeyValuePair";

const ContractDetails = () => {
  const { contractid } = useParams();
  const [contractDetails, setContractDetails] = useState<any>({});
  const { getContractDetails, getActualContractName } = useReadConfig();
  const { networkContractsList } = useRecoilValue(networkContracts);

  useEffect(() => {
    if (networkContractsList) {
      const details = getContractDetails(contractid as string);
      setContractDetails(details);
    }
  }, [networkContractsList]);

  return (
    <Sheet>
      <Stack>
        <KeyValuePair keyName="Code Id:" valueName={contractDetails?.codeId} />
        <KeyValuePair
          keyName="Contract Address:"
          valueName={contractDetails?.contractAddress || "-"}
        />
        <KeyValuePair
          keyName="Contract Tag Name:"
          valueName={contractDetails?.contractTag || "-"}
        />
        <KeyValuePair
          keyName="Contract File Name:"
          valueName={getActualContractName(contractid as string) || "-"}
        />
      </Stack>
    </Sheet>
  );
};

export default ContractDetails;
