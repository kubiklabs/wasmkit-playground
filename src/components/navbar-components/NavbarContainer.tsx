import { Flex } from "@chakra-ui/react";
import ConnectWalletButton from "../buttons/ConnectWalletButton";
import NetworkSwitch from "./NetworkSwitch";

const NavbarContainer = () => {
  return (
    <Flex
      zIndex={"10"}
      position={"absolute"}
      top={"0"}
      right={"0"}
      // bg={"#A9DFD810"}
      width={"100%"}
      p={"10px"}
      pt={"20px"}
      pr={"40px"}
      backdropFilter={"blur(5px)"}
      justifyContent={"end"}
      // borderBottom={"2px solid #A9DFD810"}
      gap={"20px"}
    >
      <ConnectWalletButton />
      <NetworkSwitch />
    </Flex>
  );
};

export default NavbarContainer;
