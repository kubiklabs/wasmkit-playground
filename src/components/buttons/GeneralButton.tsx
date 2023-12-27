import { Button, ButtonProps } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import CommonButton from "./CommonButton";

const GeneralButton = (props: ButtonProps) => {
  const tabName = useLocation().pathname.split("/")[2];
  return (
    <CommonButton
      bg={
        props.id !== tabName
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.15)"
      }
      {...props}
      _focus={{
        outline: "none",
      }}
      _hover={{
        border: `${props.id === tabName ? "1px solid #A9DFD8" : "none"}`,
        bg: "rgba(255, 255, 255, 0.19)",
      }}
      border={props.id === tabName ? "1px solid #A9DFD8" : "none"}
    >
      {props.name}
    </CommonButton>
  );
};

export default GeneralButton;
