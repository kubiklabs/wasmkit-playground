import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const SelectInput = ({
  inputList,
  label,
  onChange,
}: {
  inputList: any[];
  label: string;
  onChange: (query: string) => void;
}) => {
  const handleOptionChange = (event: any) => {
    onChange(event.target.value);
  };

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
        onChange={handleOptionChange}
      >
        {inputList?.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
