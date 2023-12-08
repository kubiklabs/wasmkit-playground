import { Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const NavigationLink = ({ path, name }: { path: string; name: string }) => {
  const curPath = useLocation().pathname;
  return (
    <Box
      background={curPath === path ? "#A9DFD8" : ""}
      fontSize={"24px"}
      color={curPath === path ? "#17281" : "white"}
      py={"10px"}
      borderRadius={"0 10px 10px 0"}
      fontWeight={"600"}
    >
      <Link
        style={{
          width: "100%",
          display: "block",
        }}
        to={path}
      >
        {name}
      </Link>
    </Box>
  );
};

export default NavigationLink;
