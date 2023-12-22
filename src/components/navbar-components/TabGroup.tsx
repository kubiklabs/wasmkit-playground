import { Flex } from "@chakra-ui/react";
import GeneralButton from "../buttons/GeneralButton";
import { Link, useParams } from "react-router-dom";
import TabButton from "./TabButton";

const TabGroup = () => {
  const { contractid } = useParams();

  return (
    <Flex width={"100%"} gap={"20px"}>
      <TabButton
        name="Contract Details"
        id="details"
        path={`/${contractid}/details`}
      />
      <TabButton name="Query" id="query" path={`/${contractid}/query`} />
      <TabButton name="Execute" id="execute" path={`/${contractid}/execute`} />
    </Flex>
  );
};

export default TabGroup;
