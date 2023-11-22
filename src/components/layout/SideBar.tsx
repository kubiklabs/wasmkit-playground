import { Stack } from "@chakra-ui/react";
import LogoComp from "../sidebar-components/LogoComp";
import NavLinks from "../sidebar-components/NavLinks";

const SideBar = () => {
  return (
    <Stack
      width={"300px"}
      borderRight={"2px solid rgba(255, 255, 255, 0.60)"}
      height={"100vh"}
      padding={"20px 0px"}
    >
      <LogoComp />
      <NavLinks />
    </Stack>
  );
};

export default SideBar;
