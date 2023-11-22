import { Flex, Image, Text } from "@chakra-ui/react";
import playgroundLogo from "../../assets/logoLight.png";

const LogoComp = () => {
  return (
    <Flex
      borderBottom={"2px solid rgba(255, 255, 255, 0.60)"}
      justifyContent={"center"}
      alignItems={"center"}
      pb={"20px"}
      mx={"20px"}
    >
      <Image boxSize={"66px"} src={playgroundLogo} />
      <Text fontWeight={"700"} fontSize={"2rem"} color={"white"}>
        Playground
      </Text>
    </Flex>
  );
};

export default LogoComp;
