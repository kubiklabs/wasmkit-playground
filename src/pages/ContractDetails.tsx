import { useParams } from "react-router-dom";
import Sheet from "../components/layout/Sheet";
import { useEffect, useState } from "react";
import { useReadConfig } from "../hooks/useReadConfig";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { useRecoilValue } from "recoil";
import { networkContracts } from "../context/networkContractState";

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
        <Flex alignItems={"center"} gap={"10px"}>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>
            Code Id:{" "}
          </Text>
          <Text fontSize={"1.5rem"}>{contractDetails?.codeId}</Text>
        </Flex>
        <Flex alignItems={"center"} gap={"10px"}>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>
            Contract Address:{" "}
          </Text>
          <Text fontSize={"1.5rem"}>
            {contractDetails?.contractAddress || "-"}
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={"10px"}>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>
            Contract Tag Name:{" "}
          </Text>
          <Text fontSize={"1.5rem"}>{contractDetails?.contractTag || "-"}</Text>
        </Flex>
        <Flex alignItems={"center"} gap={"10px"}>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>
            Contract File Name:{" "}
          </Text>
          <Text fontSize={"1.5rem"}>
            {getActualContractName(contractid as string) || "-"}
          </Text>
        </Flex>
      </Stack>
    </Sheet>
  );
};

export default ContractDetails;
