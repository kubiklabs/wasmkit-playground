import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import Card from "../components/containers/Card";
import { useRecoilValue } from "recoil";
import {
  activeNetworkState,
  networkContracts,
} from "../context/networkContractState";
import { useNavigate } from "react-router-dom";

const ContractList = () => {
  const navigate = useNavigate();
  const { networkContractsList } = useRecoilValue(networkContracts);
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  return (
    <>
      <Text
        fontWeight={"bold"}
        textAlign={"left"}
        color={"white"}
        fontSize={"2rem"}
      >
        Select a contract
      </Text>
      <Flex
        gap={"20px"}
        minW={"350px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
      >
        {activeNetworkId &&
          networkContractsList[activeNetworkId].map((contract: any) => {
            const contractName = contract.tagName || contract.name;

            return (
              <Card
                flex={1}
                onClick={() => navigate(`/${contractName}/details`)}
                maxW={"400px"}
                p={"20px"}
                cursor={"pointer"}
                _hover={{
                  bg: "#ffffff20",
                }}
                color="white"
              >
                {contractName}
              </Card>
            );
          })}
      </Flex>
    </>
  );
};

export default ContractList;
