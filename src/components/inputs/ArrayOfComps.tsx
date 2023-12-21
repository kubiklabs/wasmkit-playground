import { Flex, FormLabel, Stack, Tooltip, keyframes } from "@chakra-ui/react";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const ArrayOfComps = ({
  component,
  label,
  onChange,
}: {
  component: JSX.Element;
  label: string;
  onChange: (value: any[]) => void;
}) => {
  const [array, setArray] = useState<JSX.Element[]>([]);
  const [inputArray, setInputArray] = useState<any[]>([{}]);

  const onAdd = () => {
    setArray((prev) => {
      const newArray = [...prev, component];
      // prev.push(component);
      return [...newArray];
    });
    setInputArray((prev) => {
      const newArray = [...prev, {}];
      // newArray.push({});
      return [...newArray];
    });
  };

  const onRemove = (index: number) => {
    setArray((prev) => {
      prev.splice(index, 1);
      const newArray = [...prev];
      return [...newArray];
    });
    setInputArray((prev) => {
      prev.splice(index, 1);
      const newArray = [...prev];
      onChange(newArray);
      return [...newArray];
    });
  };

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputArray((prev) => {
      let newArray = prev;
      newArray[index][name] = value;
      onChange(newArray);

      return [...newArray];
    });
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
        onChange={(e) => handleChange(e, 0)}
      >
        {component}
        <Tooltip label="Add Field">
          <FontAwesomeIcon
            cursor={"pointer"}
            size={"lg"}
            onClick={onAdd}
            icon={faCirclePlus}
          />
        </Tooltip>
      </Flex>
      {array.map((component, index) => {
        return index ? (
          <Flex
            onChange={(e) => handleChange(e, index)}
            width={"100%"}
            alignItems={"center"}
            gap={"10px"}
            key={index}
          >
            {component}
            <Tooltip label="Remove Field">
              <FontAwesomeIcon
                cursor={"pointer"}
                size={"lg"}
                onClick={() => onRemove(index)}
                icon={faCircleMinus}
              />
            </Tooltip>
          </Flex>
        ) : null;
      })}
    </Stack>
  );
};

export default ArrayOfComps;
