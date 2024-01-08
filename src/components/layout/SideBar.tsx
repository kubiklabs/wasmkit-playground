import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import LogoComp from "../sidebar-components/LogoComp";
import NavLinks from "../sidebar-components/NavLinks";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Stack
        width={"300px"}
        borderRight={"2px solid rgba(255, 255, 255, 0.60)"}
        height={"100vh"}
        padding={"20px 0px"}
        display={{ base: "none", md: "block" }}
      >
        <LogoComp />
        <NavLinks />
      </Stack>
      <Stack
        display={{ base: "flex", md: "hidden" }}
        padding={"10px 0 0 10px"}
        align={"left"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Button
          ref={btnRef}
          colorScheme="black"
          onClick={onOpen}
          display={"block"}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <LogoComp />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"xs"}
        >
          <DrawerOverlay />
          <DrawerContent style={{ backgroundColor: "black" }}>
            <DrawerCloseButton style={{ color: "white" }} />
            <DrawerHeader>
              <LogoComp />
            </DrawerHeader>
            <DrawerBody>
              <NavLinks />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
    </div>
  );
};

export default SideBar;
