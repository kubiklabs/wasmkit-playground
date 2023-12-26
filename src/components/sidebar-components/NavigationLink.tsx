import { Box, Text, Tooltip } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const NavigationLink = ({ path, name }: { path: string; name: string }) => {
  let curPath = useLocation().pathname.split("/")[1];
  curPath = decodeURIComponent(curPath);

  return (
    <Box
      w={"100%"}
      background={curPath === path.split("/")[1] ? "#A9DFD8" : ""}
      fontSize={"24px"}
      color={curPath === path.split("/")[1] ? "#171821" : "#ffffff"}
      p={"10px"}
      // borderRadius={"0 10px 10px 0"}
    >
      <Tooltip label={name}>
        <Link
          style={{
            width: "100%",
            display: "block",
            fontWeight: "bold",
          }}
          to={path}
        >
          <Text
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            _hover={{
              color: curPath === path.split("/")[1] ? "#171821" : "#ffffff90",
            }}
          >
            {name}
          </Text>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default NavigationLink;
