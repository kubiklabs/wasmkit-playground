import { Flex } from "@chakra-ui/react";
import GeneralButton from "../buttons/GeneralButton";
import { Link, useParams } from "react-router-dom";

const TabGroup = () => {
  const { contractid } = useParams();
  console.log(contractid);

  return (
    <Flex gap={"20px"}>
      <Link to={`/${contractid}/contracts`}>
        <GeneralButton name="Contract Details" />
      </Link>
      <Link to={`/${contractid}/Query`}>
        <GeneralButton name="Query" />
      </Link>
      <Link to={`/${contractid}/Execute`}>
        <GeneralButton name="Execute" />
      </Link>
    </Flex>
  );
};

export default TabGroup;
