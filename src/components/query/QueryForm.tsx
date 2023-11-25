import { Flex } from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import ActionButton from "../buttons/ActionButton";

const DATA = ["getCount", "getAccount", "getClient"];

const QueryForm = () => {
  return (
    <Flex flexDirection={"column"} gap={"10px"}>
      <form>
        <Flex alignItems={"end"} flexDirection={"column"} gap={"10px"}>
          <SelectInput label="Select Query" inputList={DATA} />
          <ActionButton name="Query" />
        </Flex>
      </form>
    </Flex>
  );
};

export default QueryForm;
