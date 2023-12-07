import { Flex } from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import ActionButton from "../buttons/ActionButton";
import { useParams } from "react-router-dom";
import contractSchema from "../../contracts/schema/contractSchema.json";
import { toContractName } from "../../utils/helpers";
import { useEffect, useState } from "react";
import TextInput from "../inputs/TextInput";
import { MsgObject } from "../../types/dataTypes";
import { useReadSchema } from "../../hooks/useReadSchema";

type IContractSchema = typeof contractSchema;

const DATA = ["getCount", "getAccount", "getClient"];

const QueryForm = ({
  onMsgChange,
}: {
  onMsgChange: (msg: MsgObject) => void;
}) => {
  const { contractid } = useParams();

  const [queryList, setQueryList] = useState<string[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [params, setParams] = useState<any[]>([]);
  const [msg, setMsg] = useState<MsgObject>({});

  const { getInputs } = useReadSchema();

  useEffect(() => {
    fetchQueryList();
  }, []);

  //var name manupulation for matching the name format in schema
  const contractName = toContractName(contractid as string);

  //get the ReadOnlyInterface object from the schema arrray
  const queryInterface = contractSchema[
    `${contractName}Contract` as keyof IContractSchema
  ].schemaData.find((item) => item.name === `${contractName}ReadOnlyInterface`);

  //function to create the list of available query msgs from the schema JSON
  const fetchQueryList = () => {
    //create the final array of query msgs.
    const resultArray: string[] = (queryInterface as any).properties.map(
      (property: any) => {
        return property.name;
      }
    );
    setQueryList(resultArray);
    setActiveQuery(resultArray[0]);
    fetchInputParams(resultArray[0]);
  };

  //Callback function from the SelectInput component to process the change in input.
  const handleInputChange = (query: any) => {
    console.log(query);
    setActiveQuery(query);
    fetchInputParams(query);
  };

  const handleParamInputChange = (e: any) => {
    const { name, value } = e.target;
    //convert camelCase to snake_case
    let convertedName = name.replace(/([A-Z])/g, "_$1").toLowerCase();
    let convertedQuery = activeQuery.replace(/([A-Z])/g, "_$1").toLowerCase();
    let newMsg = msg;
    newMsg[convertedQuery][convertedName] = value;
    onMsgChange(newMsg);
  };

  const changeMsg = (msg: MsgObject) => {
    setMsg(msg);
    console.log(msg);
    onMsgChange(msg);
  };

  //Fetching the input parameter using the queryInterface. Complete operation on strings using reg-ex.
  const fetchInputParams = (query: string) => {
    let convertedString = query.replace(/([A-Z])/g, "_$1").toLowerCase();

    //Find the message object from the schema Array
    const queryMessage = queryInterface?.properties.find(
      ({ name }) => name === query
    );

    if (queryMessage) {
      const { paramsArray, updatedMsg } = getInputs(
        queryMessage,
        convertedString
      );
      changeMsg(updatedMsg);
      setParams(paramsArray);
      //Extract the type string from the properties

      // match = queryMessage?.type.match(
      //   /\{([^}]*)\}\s*:\s*\{([^}]*)\}[\s,]*?(?=,|\))/g
      // );

      // if (match) {
      //   const paramTypesArr: any[] = [];

      //   //Use regex to extract the param and their types
      //   match.forEach((paramMatch: any) => {
      //     const [, paramNames, paramTypes] = paramMatch.match(
      //       /\{([^}]*)\}\s*:\s*\{([^}]*)\}/
      //     );

      //     const props = paramNames.trim().split(/,\s+/); //only params array
      //     const types = paramTypes.trim().split(/;\s+/); //params with their types
      //     console.log(props, types);
      //     // setParams(types);

      //     let newObj: any = {};

      //     props.forEach((prop: any, i: any) => {
      //       newObj[prop] = "";
      //       const propName = prop.trim();
      //       const propType = types[i].trim().replace(/\?$/, "");

      //       paramTypesArr.push({ name: propName, type: propType });
      //     });

      //     const updatedMsg: MsgObject = {
      //       // ...msg,
      //       [convertedString]: newObj,
      //     };
      //     changeMsg(updatedMsg);
      //   });

      //   paramTypesArr.forEach((val) => {
      //     const isOptional = val.type.includes("?");
      //     const typeName = val.type.split(":")[1].replace(/;$/, "").trim();
      //     paramsArray.push({
      //       name: val.name,
      //       type: typeName,
      //       isOptional,
      //     });
      //   });
      //   setParams(paramsArray);

      //   // let obj = paramTypesArr.reduce((acc: any, value: any, index: any) => {
      //   //   const isOptional = value.type.includes("?");
      //   //   const typeName = value.type.split(":")[1].replace(/;$/, "").trim();
      //   //   if (!isOptional && value.name !== "account") {
      //   //     let convertedString2 = value.name
      //   //       .replace(/([A-Z])/g, "_$1")
      //   //       .toLowerCase();
      //   //     if (typeName === "number") {
      //   //       acc[convertedString2] = 0;
      //   //     } else acc[convertedString2] = "";
      //   //   }

      //   //   return acc;
      //   // }, {});
      // } else {
      //   setParams([]);

      //   const updatedMsg: MsgObject = {
      //     // ...msg,
      //     [convertedString]: {},
      //   };
      //   changeMsg(updatedMsg);
      // }
    }
  };

  return (
    <Flex flexDirection={"column"} gap={"10px"}>
      <form>
        <Flex alignItems={"end"} flexDirection={"column"} gap={"10px"}>
          <SelectInput
            onChange={handleInputChange}
            label="Select Query"
            inputList={queryList}
          />
          {params ? (
            <Flex width={"100%"} columnGap={"20px"} flexWrap={"wrap"}>
              {params.map((param) => {
                return (
                  <TextInput
                    onChange={handleParamInputChange}
                    placeholder={param.type}
                    label={param.name}
                  />
                );
              })}
            </Flex>
          ) : null}
          <ActionButton name="Query" />
        </Flex>
      </form>
    </Flex>
  );
};

export default QueryForm;
