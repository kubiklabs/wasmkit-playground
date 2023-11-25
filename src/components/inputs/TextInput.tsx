import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

const TextInput = ({ label }: { label: string }, props?: InputProps) => {
  return (
    <FormControl>
      <FormLabel
        color="#F5F5F5"
        fontSize="32px"
        fontWeight="600"
        letterSpacing="3.2px"
        mb={"0"}
      >
        {label}
      </FormLabel>
      <Input {...props} size={"lg"} />
    </FormControl>
  );
};

export default TextInput;
