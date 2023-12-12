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
  flex,
}: {
  flex?: number;
  onMsgChange: (msg: MsgObject) => void;
}) => {
  const { contractid } = useParams();

  const [queryList, setQueryList] = useState<string[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [params, setParams] = useState<any[]>([]);
  const [msg, setMsg] = useState<MsgObject>({});

  const { getInputs } = useReadSchema(true);

  useEffect(() => {
    fetchQueryList();
  }, [contractid]);

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
    }
  };

  return (
    <Flex flex={flex} flexDirection={"column"} gap={"10px"}>
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
          {/* {params ? (
            <Flex width={"100%"} columnGap={"20px"} flexWrap={"wrap"}>
              {params.map((param) => {
                return !param.isOptional ? (
                  <TextInput placeholder={param.type} label={param.name} />
                ) : null;
              })}
            </Flex>
          ) : null} */}
          <ActionButton name="Query" />
        </Flex>
      </form>
    </Flex>
  );
};

export default QueryForm;
