import { Box, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Sheet = (props: any) => {
  const { address } = useParams();
  return (
    <Flex
      flexDirection={"column"}
      borderRadius={"5px"}
      width={"100%"}
      height={"100%"}
      bg="rgba(255, 255, 255, 0.05)"
      mt={"20px"}
      overflowY={"auto"}
      color={"white"}
      p={"60px"}
      gap={"20px"}
    >
      <Box display={"flex"} fontSize={"1.3rem"}>
        <Text>Your selected address - </Text>
        <Text fontWeight={"bold"}>neutron1sen0mfa...ygk</Text>
      </Box>
      {props.children}
    </Flex>
  );
};

export default Sheet;
