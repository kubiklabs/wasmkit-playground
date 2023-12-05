import { Stack } from "@chakra-ui/react";
import NavigationLink from "./NavigationLink";

import { useNetworkConfig } from "../../hooks/useNetworkConfig";
import { useRef } from "react";

const NavLinks = () => {
  const { getContractsList } = useNetworkConfig();
  const contractList = useRef(getContractsList());
  return (
    <Stack mt={"20px"} gap={"0"}>
      {contractList &&
        contractList.current.map((contractName) => {
          return (
            <NavigationLink
              name={contractName}
              path={`/${contractName}/contracts`}
            />
          );
        })}
    </Stack>
  );
};

export default NavLinks;
