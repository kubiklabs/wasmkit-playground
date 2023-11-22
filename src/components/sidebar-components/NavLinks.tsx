import { Stack } from "@chakra-ui/react";
import NavigationLink from "./NavigationLink";

const NavLinks = () => {
  return (
    <Stack mt={"20px"} gap={"0"}>
      <NavigationLink name="Contract 1" path="/1" />
      <NavigationLink name="Contract 2" path="/2" />

      <NavigationLink name="Contract 3" path="/3" />
      <NavigationLink name="Contract 4" path="/4" />
      <NavigationLink name="Contract 5" path="/5" />
    </Stack>
  );
};

export default NavLinks;
