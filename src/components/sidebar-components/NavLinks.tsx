import { Divider, Stack } from "@chakra-ui/react";
import NavigationLink from "./NavigationLink";
import { useRecoilValue } from "recoil";
import {
  activeNetworkState,
  networkContracts,
} from "../../context/networkContractState";
import { scrollbarStyle } from "../../utils/constants";

const NavLinks = () => {
  const { networkContractsList } = useRecoilValue(networkContracts);
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  return (
    <Stack
      sx={scrollbarStyle}
      overflowY={"auto"}
      h={"100%"}
      alignItems={"center"}
      mt={"20px"}
      gap={"0"}
    >
      <NavigationLink key={""} name={"Overview"} path={`/`} />
      <Divider my={"10px"} width={"90%"} borderColor={"#ffffff60"} />

      {activeNetworkId &&
        networkContractsList[activeNetworkId].map(
          (contract: any, index: number) => {
            const contractName = contract.tagName || contract.name;
            return (
              <>
                <NavigationLink
                  key={contractName}
                  name={contractName}
                  path={`/${contractName}/details`}
                />
                {index + 1 !== networkContractsList[activeNetworkId].length ? (
                  <Divider width={"90%"} borderColor={"#ffffff60"} />
                ) : null}
              </>
            );
          }
        )}
    </Stack>
  );
};

export default NavLinks;
