import { Flex, Stack } from "@chakra-ui/react";
import Sheet from "../components/layout/Sheet";
import Preview from "../components/containers/Preview";
import Result from "../components/containers/Result";
import ExecuteForm from "../components/execute/ExecuteForm";

const ExecuteContract = () => {
  return (
    <Sheet gap="10px">
      <Flex height={"100%"} width={"100%"} gap={"40px"}>
        <Stack gap={"40px"} flex={1}>
          hello
          <ExecuteForm />
          <Result />
        </Stack>
        <Preview />
      </Flex>
    </Sheet>
  );
};

export default ExecuteContract;
