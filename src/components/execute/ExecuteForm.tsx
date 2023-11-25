import { Flex } from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import ActionButton from "../buttons/ActionButton";
import TextInput from "../inputs/TextInput";
const DATA = ["close", "execute", "propose"];

const ExecuteForm = () => {
  return (
    <Flex flexDirection={"column"} gap={"10px"}>
      <form>
        <Flex alignItems={"end"} flexDirection={"column"} gap={"10px"}>
          <SelectInput label="Select Command" inputList={DATA} />
          <Flex columnGap={"20px"} flexWrap={"wrap"}>
            <TextInput label="Var 1" />
            <TextInput label="Var 2" />
            <TextInput label="Var 3" />
            <TextInput label="Var 4" />
          </Flex>
          <ActionButton name="Execute" />
        </Flex>
      </form>
    </Flex>
  );
};

export default ExecuteForm;
