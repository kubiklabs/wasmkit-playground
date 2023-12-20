import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

const TextInput = ({ name, inputType, label, smallLabel, ...props }: any) => {
  return (
    <FormControl>
      {label ? (
        <FormLabel
          color="#F5F5F5"
          fontSize={smallLabel ? "18px" : "24px"}
          fontWeight="600"
          letterSpacing="3.2px"
          mb={"0"}
        >
          {label}
        </FormLabel>
      ) : null}
      <Input
        borderColor={"#ffffff39"}
        min={"0"}
        type={inputType}
        name={name || label}
        {...props}
        size={"lg"}
      />
    </FormControl>
  );
};

export default TextInput;
