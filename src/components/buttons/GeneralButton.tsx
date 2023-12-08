import { Button, ButtonProps } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GeneralButton = (props: ButtonProps) => {
  const { tabName } = useParams();
  return (
    <Button
      color={"white"}
      width={"250px"}
      borderRadius={"5px"}
      bg={"rgba(255, 255, 255, 0.05)"}
      {...props}
      _focus={{
        outline: "none",
      }}
      _hover={{
        bg: "rgba(255, 255, 255, 0.15)",
      }}
      border={props.name === tabName ? "2px solid #A9DFD8" : "none"}
    >
      {props.name}
    </Button>
  );
};

export default GeneralButton;
