import { Button, ButtonProps } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

const GeneralButton = (props: ButtonProps) => {
  const tabName = useLocation().pathname.split("/")[2];
  return (
    <Button
      color={"white"}
      width={"250px"}
      borderRadius={"5px"}
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
        bg: "rgba(255, 255, 255, 0.15)",
        border: `${props.id === tabName ? "1px solid #A9DFD8" : "none"}`,
      }}
      border={props.id === tabName ? "1px solid #A9DFD8" : "none"}
    >
      {props.name}
    </Button>
  );
};

export default GeneralButton;
