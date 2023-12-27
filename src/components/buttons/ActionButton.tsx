import { ButtonProps } from "@chakra-ui/react";
import GeneralButton from "./GeneralButton";
import { useConnectWallet } from "../../hooks/useTxnClient";
import { walletState } from "../../context/walletState";
import { useRecoilValue } from "recoil";
import CommonButton from "./CommonButton";

const ActionButton = (props: ButtonProps) => {
  const { address } = useRecoilValue(walletState);
  console.log(props.disabled);

  return (
    <CommonButton
      isDisabled={address ? false : true}
      {...props}
      bg={"#A9DFD8"}
      borderRadius={"10px"}
      width={"150px"}
      color={"black"}
      _hover={{
        bg: "#A9DFD899 ",
        border: "none",
      }}
    >
      {props.name}
    </CommonButton>
  );
};

export default ActionButton;
