import { Flex } from "@chakra-ui/react";
import GeneralButton from "../buttons/GeneralButton";
import { Link, useParams } from "react-router-dom";

const TabGroup = () => {
  const { contractid } = useParams();

  return (
    <Flex width={"100%"} gap={"20px"}>
      <Link style={{ flex: 1 }} to={`/${contractid}/Details`}>
        <GeneralButton width={"100%"} id="Details" name="Contract Details" />
      </Link>
      <Link style={{ flex: 1 }} to={`/${contractid}/Query`}>
        <GeneralButton width={"100%"} id="Query" name="Query" />
      </Link>
      <Link style={{ flex: 1 }} to={`/${contractid}/Execute`}>
        <GeneralButton width={"100%"} id="Execute" name="Execute" />
      </Link>
    </Flex>
  );
};

export default TabGroup;
