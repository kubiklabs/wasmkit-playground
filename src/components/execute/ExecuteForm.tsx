import { Flex } from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import ActionButton from "../buttons/ActionButton";
import TextInput from "../inputs/TextInput";
import { useEffect, useState } from "react";
import { MsgObject } from "../../types/dataTypes";
import { toContractName } from "../../utils/helpers";
import contractSchema from "../../contracts/schema/contractSchema.json";
import { useParams } from "react-router-dom";
import { useReadSchema } from "../../hooks/useReadSchema";

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

  const { getInputs } = useReadSchema();

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

  const changeMsg = (msg: MsgObject) => {
    setMsg(msg);
    console.log(msg);
    onMsgChange(msg);
  };

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

  return (
    <Flex flexDirection={"column"} gap={"10px"}>
      <form>
        <Flex alignItems={"end"} flexDirection={"column"} gap={"10px"}>
          <SelectInput
            onChange={handleInputChange}
            label="Select Command"
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

          <ActionButton name="Execute" />
        </Flex>
      </form>
    </Flex>
  );
};

export default ExecuteForm;
