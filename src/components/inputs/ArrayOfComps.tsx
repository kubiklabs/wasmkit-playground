import { Flex, FormLabel, Stack } from "@chakra-ui/react";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const ArrayOfComps = ({
  component,
  label,
}: {
  component: JSX.Element;
  label: string;
}) => {
  const [array, setArray] = useState<JSX.Element[]>([]);
  [component];

  const onAdd = () => {
    const newArray = array;
    newArray.push(component);
    setArray((prev) => {
      return [...newArray];
    });
  };

  const onRemove = () => {
    const newArray = array;
    newArray.pop();
    setArray((prev) => [...newArray]);
  };

  return (
    <Stack width={"100%"}>
      <FormLabel
        color="#F5F5F5"
        fontSize="24px"
        fontWeight="600"
        letterSpacing="3.2px"
        mb={"0"}
      >
        {label}
      </FormLabel>
      <Flex
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
      >
        {component}
        <FontAwesomeIcon
          cursor={"pointer"}
          size={"lg"}
          onClick={onAdd}
          icon={faCirclePlus}
        />
      </Flex>
      {array.map((component, index) => {
        return index ? (
          <Flex width={"100%"} alignItems={"center"} gap={"10px"} key={index}>
            {component}
            <FontAwesomeIcon
              cursor={"pointer"}
              size={"lg"}
              onClick={onRemove}
              icon={faCircleMinus}
            />
          </Flex>
        ) : null;
      })}
    </Stack>
  );
};

export default ArrayOfComps;
