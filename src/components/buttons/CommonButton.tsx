import { Button, ButtonProps } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

const CommonButton = (props: ButtonProps) => {
  return (
    <Button
      color={"white"}
      // maxWidth={"250px"}
      borderRadius={"5px"}
      {...props}
      _focus={{
        outline: "none",
      }}
      _disabled={{
        bg: "rgba(255, 255, 255, 0.5)",
        cursor: "not-allowed",
      }}
    >
      {props.children}
    </Button>
  );
};

export default CommonButton;
