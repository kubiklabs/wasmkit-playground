import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const SelectInput = ({
  inputList,
  label,
}: {
  inputList: any[];
  label: string;
}) => {
  return (
    <FormControl>
      <FormLabel
        color="#F5F5F5"
        fontSize="32px"
        fontWeight="600"
        letterSpacing="3.2px"
      >
        {label}
      </FormLabel>
      <Select
        size={"lg"}
        cursor={"pointer"}
        border={"none"}
        _focusVisible={{
          borderColor: "white",
        }}
        bg={"rgba(255, 255, 255, 0.05)"}
      >
        {inputList?.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
