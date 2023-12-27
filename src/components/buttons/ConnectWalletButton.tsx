import GeneralButton from "./GeneralButton";
import {
  Box,
  Divider,
  Flex,
  Link,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import { useConnectWallet, useDisconnetWallet } from "../../hooks/useTxnClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { activeNetworkState } from "../../context/networkContractState";
import { toast } from "react-toastify";

const ConnectWalletButton = () => {
  const { activeNetworkId, isLoggingIn } = useRecoilValue(activeNetworkState);

  const { address, balance, nickName, addrPrefix, isTestnet } =
    useRecoilValue(walletState);
  const disconnectWallet = useDisconnetWallet();
  const connectWallet = useConnectWallet();

  const handleWalletConnect = async () => {
    if (activeNetworkId) await connectWallet(activeNetworkId);
    else {
      toast.error("Select Network");
    }
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address Copied");
    }
  };

  return (
    <>
      {!address && !isLoggingIn ? (
        <GeneralButton
          onClick={handleWalletConnect}
          py={"30px"}
          name="Connect Wallet"
        />
      ) : (
        <Flex
          color={"white"}
          minWidth={"250px"}
          borderRadius={"5px"}
          bg={"rgba(255, 255, 255, 0.05)"}
          alignItems={"center"}
          justifyContent={"center"}
          fontSize={"20px"}
          gap={"15px"}
          p={"15px"}
          backdropFilter={"blur(15px)"}
        >
          {isLoggingIn ? (
            <Spinner />
          ) : (
            <>
              <Link
                _hover={{
                  textDecoration: "none",
                  color: "#A9DFD8",
                }}
                target="_blank"
                href={`https://${
                  isTestnet ? "testnet." : ""
                }mintscan.io/${addrPrefix}${
                  isTestnet ? "-testnet" : ""
                }/address/${address}`}
              >
                <Text>{nickName}</Text>
              </Link>
              <Divider height={"50%"} orientation="vertical" />
              <Text fontWeight={"bold"}>
                {balance?.amount} {balance?.denom}
              </Text>
              <Divider height={"50%"} orientation="vertical" />
              <Tooltip label="Copy address">
                <Box
                  onClick={handleCopyAddress}
                  cursor={"pointer"}
                  _hover={{ color: "skyblue" }}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </Box>
              </Tooltip>
              <Divider height={"50%"} orientation="vertical" />
              <Tooltip label="Logout">
                <Box
                  onClick={disconnectWallet}
                  cursor={"pointer"}
                  _hover={{ color: "red" }}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Box>
              </Tooltip>
            </>
          )}
        </Flex>
      )}
    </>
  );
};

export default ConnectWalletButton;
