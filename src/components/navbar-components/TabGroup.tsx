import { Flex } from "@chakra-ui/react";
import GeneralButton from "../buttons/GeneralButton";
import { Link, useParams } from "react-router-dom";

const TabGroup = () => {
  const { contractid } = useParams();
  console.log(contractid);

  return (
    <Flex gap={"20px"}>
      <Link to={`/${contractid}/Details`}>
        <GeneralButton id="Details" name="Contract Details" />
      </Link>
      <Link to={`/${contractid}/Query`}>
        <GeneralButton id="Query" name="Query" />
      </Link>
      <Link to={`/${contractid}/Execute`}>
        <GeneralButton id="Execute" name="Execute" />
      </Link>
    </Flex>
  );
};

export default TabGroup;
