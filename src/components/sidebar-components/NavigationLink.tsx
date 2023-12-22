import { Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const NavigationLink = ({ path, name }: { path: string; name: string }) => {
  let curPath = useLocation().pathname.split("/")[1];
  curPath = decodeURIComponent(curPath);

  return (
    <Box
      background={curPath === path.split("/")[1] ? "#A9DFD8" : ""}
      fontSize={"24px"}
      color={curPath === path.split("/")[1] ? "#17281" : "white"}
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
