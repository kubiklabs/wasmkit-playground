import { Flex } from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import ActionButton from "../buttons/ActionButton";
import TextInput from "../inputs/TextInput";
import { useEffect, useState } from "react";
import { MsgObject } from "../../types/dataTypes";
import { camelToSnake, toContractName } from "../../utils/helpers";
import contractSchema from "../../contracts/schema/contractSchema.json";
import { useParams } from "react-router-dom";
import { useReadSchema } from "../../hooks/useReadSchema";
import AddInput from "../inputs/AddInput";

type IContractSchema = typeof contractSchema;

const DATA = ["close", "execute", "propose"];

const ExecuteForm = ({
  onMsgChange,
}: {
  onMsgChange: (msg: MsgObject) => void;
}) => {
  const { contractid } = useParams();

  const [queryList, setQueryList] = useState<string[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [params, setParams] = useState<any[]>([]);
  const [msg, setMsg] = useState<MsgObject>({});
  const [optionalMsg, setOptionalMsg] = useState<MsgObject>({});

  const [optionalArray, setOptionalArray] = useState<any[]>([]);
  const [optionalInputsArray, setOptionalInputsArray] = useState<any[]>([]);
  const [showOptional, setShowOptional] = useState(false);

  const { getInputs } = useReadSchema(false);

  useEffect(() => {
    fetchQueryList();
  }, []);

  //var name manupulation for matching the name format in schema
  const contractName = toContractName(contractid as string);

  //get the Interface object from the schema arrray
  const queryInterface = contractSchema[
    `${contractName}Contract` as keyof IContractSchema
  ].schemaData.find((item) => item.name === `${contractName}Interface`);

  //function to create the list of available execute msgs from the schema JSON
  const fetchQueryList = () => {
    //create the final array of execute msgs.
    const resultArray: string[] = (queryInterface as any).properties.map(
      (property: any) => {
        return property.name;
      }
    );
    setQueryList(resultArray);
    setActiveQuery(resultArray[0]);
    fetchInputParams(resultArray[0]);
  };

  //Fetching the input parameter using the queryInterface. Complete operation on strings using reg-ex.
  const fetchInputParams = (query: string) => {
    let convertedString = camelToSnake(query);

    //Find the message object from the schema Array
    const executeMessage = queryInterface?.properties.find(
      ({ name }) => name === query
    );

    if (executeMessage) {
      const { paramsArray, updatedMsg, optionalArray } = getInputs(
        executeMessage,
        convertedString
      );
      console.log(optionalArray);

      changeMsg(updatedMsg);
      setParams(paramsArray);
      setOptionalArray(optionalArray);
      console.log(paramsArray);
    }
  };

  const handleOptionParams = (index: number) => {
    const newOpInput = [...optionalInputsArray, optionalArray[index]];
    setOptionalInputsArray(newOpInput);

    let newOpArr = optionalArray;
    newOpArr.splice(index, 1);

    console.log(newOpArr);
    console.log(newOpInput);

    setOptionalArray(newOpArr);
  };

  const changeMsg = (msg: MsgObject) => {
    setMsg(msg);
    console.log(msg);
    onMsgChange(msg);
  };

  const handleInputChange = (query: any) => {
    console.log(query);
    setOptionalInputsArray([]);
    setActiveQuery(query);
    fetchInputParams(query);
  };

  const handleParamInputChange = (e: any) => {
    const { name, value } = e.target;
    //convert camelCase to snake_case
    let convertedName = camelToSnake(name);
    let convertedQuery = camelToSnake(activeQuery);
    let newMsg = msg;
    newMsg[convertedQuery][convertedName] = value;
    onMsgChange(newMsg);
  };

  const handleOptionParamsChange = (e: any) => {
    const { name, value } = e.target;
    //convert camelCase to snake_case
    let convertedName = camelToSnake(name);
    let convertedQuery = camelToSnake(activeQuery);
    let newMsg = optionalMsg;

    newMsg[convertedName] = value;
    console.log(newMsg);
  };

  return (
    <Flex flexDirection={"column"} gap={"10px"}>
      <form>
        <Flex alignItems={"end"} flexDirection={"column"} gap={"10px"}>
          <SelectInput
            onChange={handleInputChange}
            label="Select Command"
            inputList={queryList}
          />
          {optionalArray ? (
            <Flex
              gap={"10px"}
              width={"100%"}
              columnGap={"20px"}
              flexWrap={"wrap"}
            >
              {optionalArray.map((param, index) => {
                return (
                  <AddInput
                    key={param.name}
                    onClick={() => handleOptionParams(index)}
                    content={param.name}
                  />
                );
              })}
            </Flex>
          ) : null}
          {optionalInputsArray ? (
            <Flex width={"100%"} columnGap={"20px"} flexWrap={"wrap"}>
              {optionalInputsArray.map((param) => {
                return (
                  <TextInput
                    onChange={handleOptionParamsChange}
                    placeholder={param.type}
                    label={param.name}
                    key={param.name}
                  />
                );
              })}
            </Flex>
          ) : null}
          {params ? (
            <Flex width={"100%"} columnGap={"20px"} flexWrap={"wrap"}>
              {params.map((param) => {
                return (
                  <TextInput
                    key={param.name}
                    onChange={handleParamInputChange}
                    placeholder={param.type}
                    label={param.name}
                  />
                );
              })}
            </Flex>
          ) : null}

          <ActionButton name="Execute" />
        </Flex>
      </form>
    </Flex>
  );
};

export default ExecuteForm;
