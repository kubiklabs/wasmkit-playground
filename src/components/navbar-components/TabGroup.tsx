import { Flex } from "@chakra-ui/react";
import GeneralButton from "../buttons/GeneralButton";
import { Link } from "react-router-dom";

const TabGroup = () => {
  return (
    <Flex gap={"20px"}>
      <Link to={"/112/contracts"}>
        <GeneralButton name="Contract Details" />
      </Link>
      <Link to={"/112/Query"}>
        <GeneralButton name="Query" />
      </Link>
      <Link to={"/112/Execute"}>
        <GeneralButton name="Execute" />
      </Link>
    </Flex>
  );
};

export default TabGroup;
