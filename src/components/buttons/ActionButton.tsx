import { ButtonProps } from "@chakra-ui/react";
import GeneralButton from "./GeneralButton";

const ActionButton = (props: ButtonProps) => {
  return (
    <GeneralButton
      {...props}
      bg={"#A9DFD8"}
      borderRadius={"10px"}
      width={"150px"}
      color={"black"}
      _hover={{
        bg: "A9DFD890 !mportant",
      }}
    />
  );
};

export default ActionButton;
