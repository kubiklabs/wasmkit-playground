import { Container, Flex } from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import ActionButton from "../buttons/ActionButton";
import { useParams } from "react-router-dom";
import contractSchema from "../../contracts/schema/contractSchema.json";
import { toContractName } from "../../utils/helpers";
import { useEffect, useState } from "react";
import TextInput from "../inputs/TextInput";

type IContractSchema = typeof contractSchema;

const DATA = ["getCount", "getAccount", "getClient"];

const QueryForm = () => {
  const { contractid } = useParams();
  const [queryList, setQueryList] = useState<string[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [params, setParams] = useState<any[]>([]);
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

  //Fetching the input parameter using the queryInterface. Complete operation on strings using reg-ex.
  const fetchInputParams = (query: string) => {
    let paramsArray: any[] = [];

    //Find the message object from the schema Array
    const message = queryInterface?.properties.find(
      ({ name }) => name === query
    );
    let match: RegExpMatchArray | null | undefined;

    if (message) {
      //Extract the type string from the properties
      match = message?.type.match(
        /\{([^}]*)\}\s*:\s*\{([^}]*)\}[\s,]*?(?=,|\))/g
      );

      if (match) {
        const paramTypesArr: any[] = [];

        //Use regex to extract the param and their types
        match.forEach((paramMatch: any) => {
          const [, paramNames, paramTypes] = paramMatch.match(
            /\{([^}]*)\}\s*:\s*\{([^}]*)\}/
          );

          const props = paramNames.trim().split(/,\s+/); //only params array
          const types = paramTypes.trim().split(/;\s+/); //params with their types
          console.log(props, types);
          // setParams(types);

          props.forEach((prop: any, i: any) => {
            const propName = prop.trim();
            const propType = types[i].trim().replace(/\?$/, "");

            paramTypesArr.push({ name: propName, type: propType });
          });
        });
        console.log(paramTypesArr);

        paramTypesArr.forEach((val) => {
          const isOptional = val.type.includes("?");
          const typeName = val.type.split(":")[1].replace(/;$/, "").trim();
          paramsArray.push({
            name: val.name,
            type: typeName,
            isOptional,
          });
        });
        setParams(paramsArray);
        console.log(paramsArray);

        let obj = paramTypesArr.reduce((acc: any, value: any, index: any) => {
          console.log(acc, value, index);

          const isOptional = value.type.includes("?");
          const typeName = value.type.split(":")[1].replace(/;$/, "").trim();
          if (!isOptional && value.name !== "account") {
            let convertedString2 = value.name
              .replace(/([A-Z])/g, "_$1")
              .toLowerCase();
            console.log("check me out too", typeName, value.name);
            if (typeName === "number") {
              acc[convertedString2] = 0;
            } else acc[convertedString2] = "";
          }

          return acc;
        }, {});

        console.log(obj);
      } else {
        setParams([]);
      }
    }

    console.log(query, message, match);
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
                  <TextInput placeholder={param.type} label={param.name} />
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
