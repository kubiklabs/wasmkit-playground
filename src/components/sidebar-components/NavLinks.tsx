import { Stack } from "@chakra-ui/react";
import NavigationLink from "./NavigationLink";
import { useRecoilValue } from "recoil";
import {
  activeNetworkState,
  networkContracts,
} from "../../context/networkContractState";

const NavLinks = () => {
  const { networkContractsList } = useRecoilValue(networkContracts);
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  return (
    <Stack mt={"20px"} gap={"0"}>
      {activeNetworkId &&
        networkContractsList[activeNetworkId].map((contract: any) => {
          const contractName = contract.tagName || contract.name;
          return (
            <NavigationLink
              key={contractName}
              name={contractName}
              path={`/${contractName}/details`}
            />
          );
        })}
    </Stack>
  );
};

export default NavLinks;
