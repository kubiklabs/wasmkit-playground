import { useState } from "react";
import GeneralButton from "../buttons/GeneralButton";
import { useRecoilValue } from "recoil";
import {
  activeNetworkState,
  networkContracts,
} from "../../context/networkContractState";
// import { useNetworkConfig } from "../../hooks/useNetworkConfig";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNetworkConfig } from "../../hooks/useNetworkConfig";
import { useNavigate } from "react-router-dom";

const NetworkSwitch = () => {
  const navigate = useNavigate();
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  const { networkContractsList } = useRecoilValue(networkContracts);
  const { switchActiveNetwork } = useNetworkConfig();
  // const { getNetworkContractsConfig } = useNetworkConfig();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  //   const network = Object.keys(networkContractsList);

  // const [currentNetwork, setCurrentNetwork] = useState("uni-6");

  const handleMenuState = () => {
    console.log(menuIsOpen);

    setMenuIsOpen(!menuIsOpen);
  };

  const handleNetworkSwitch = (chainId: string) => {
    if (chainId !== activeNetworkId) switchActiveNetwork(chainId);
    navigate("/");
  };

  return (
    <Box
      cursor={"pointer"}
      onClick={handleMenuState}
      // onFocusCapture={handleMenuState}
      // onBlur={handleMenuState}
      position={"relative"}
    >
      <GeneralButton
        width={"200px"}
        py={"30px"}
        name={activeNetworkId || "Select Network"}
      />
      <Box position={"absolute"} right={"10%"} bottom={"15px"}>
        <FontAwesomeIcon color="white" icon={faCaretDown} />
      </Box>
      {menuIsOpen && (
        <Stack
          backdropFilter={"blur(15px)"}
          bg={"rgba(0,0,0, 0.55)"}
          width={"100%"}
          right={"0"}
          position={"absolute"}
        >
          {networkContractsList &&
            Object.keys(networkContractsList)?.map((chainId) => {
              return (
                <Flex
                  onClick={() => handleNetworkSwitch(chainId)}
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={"10px"}
                  color={"white"}
                  width={"100%"}
                  borderRadius={"5px"}
                  bg={"rgba(0,0,0, 0.55)"}
                  _focus={{
                    outline: "none",
                  }}
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {" "}
                  <Text>{chainId}</Text>
                </Flex>
              );
            })}
        </Stack>
      )}
    </Box>
  );
};

export default NetworkSwitch;
