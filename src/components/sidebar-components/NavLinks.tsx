import { Stack } from "@chakra-ui/react";
import NavigationLink from "./NavigationLink";

import { useNetworkConfig } from "../../hooks/useNetworkConfig";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import {
  activeNetworkState,
  networkContracts,
} from "../../context/networkContractState";

const NavLinks = () => {
  const { getContractsList } = useNetworkConfig();
  const { networkContractsList } = useRecoilValue(networkContracts);
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  const contractList = useRef(getContractsList());
  return (
    <Stack mt={"20px"} gap={"0"}>
      {activeNetworkId &&
        networkContractsList[activeNetworkId].map((contractName: string) => {
          return (
            <NavigationLink
              name={contractName}
              path={`/${contractName}/Details`}
            />
          );
        })}
    </Stack>
  );
};

export default NavLinks;
