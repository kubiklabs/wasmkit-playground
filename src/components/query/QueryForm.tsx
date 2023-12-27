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
import { useAction } from "../../hooks/useAction";
import { toast } from "react-toastify";
import { useReadConfig } from "../../hooks/useReadConfig";
import { networkContracts } from "../../context/networkContractState";
import { useRecoilValue } from "recoil";

type IContractSchema = typeof contractSchema;

const DATA = ["getCount", "getAccount", "getClient"];

const QueryForm = ({
  onMsgChange,
  onResultChange,
  flex,
}: {
  flex?: number;
  onMsgChange: (msg: MsgObject) => void;
  onResultChange: (msg: MsgObject | undefined) => void;
}) => {
  const { contractid } = useParams();

  const [queryList, setQueryList] = useState<string[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [params, setParams] = useState<any[]>([]);
  const [msg, setMsg] = useState<MsgObject>({});
  const [queryInterface, setQueryInterface] = useState<
    QueryInterface | undefined
  >(undefined);

  const { networkContractsList } = useRecoilValue(networkContracts);

  const { getActualContractName } = useReadConfig();

  const { getInputs } = useReadSchema(true);

  const { sendQuery } = useAction();

  interface QueryInterface {
    kind: string;
    name: string;
    properties: {
      name: string;
      type: string;
    }[];
  }

  useEffect(() => {
    //var name manupulation for matching the name format in schema
    if (networkContractsList !== undefined) {
      const contractName = toContractName(
        getActualContractName(contractid as string)
      );
      console.log(
        contractid,
        getActualContractName(contractid as string),
        contractName
      );
      let queryInterface: QueryInterface | undefined;
      try {
        queryInterface = contractSchema[
          `${contractName}Contract` as keyof IContractSchema
        ].schemaData.find(
          (item) => item.name === `${contractName}ReadOnlyInterface`
        );
      } catch (error) {
        toast.error("Interface not found");
        console.log(error);
        return;
      }
      setQueryInterface(queryInterface);
      // setContractName(contractName);
      fetchQueryList(queryInterface as QueryInterface);
    }
  }, [contractid, networkContractsList]);

  /**
   * function to create the list of available query msgs from the schema JSON
   */
  const fetchQueryList = (queryInterface: QueryInterface) => {
    //create the final array of query msgs.
    const resultArray: string[] = (queryInterface as any).properties.map(
      (property: any) => {
        return property.name;
      }
    );
    setQueryList(resultArray);
    setActiveQuery(resultArray[0]);
    fetchInputParams(resultArray[0], queryInterface);
  };

  /**
   * Callback function from the SelectInput component to process the change in input.
   */
  const handleInputChange = (query: any) => {
    console.log(query);
    setActiveQuery(query);
    fetchInputParams(query, queryInterface as QueryInterface);
  };

  /**
   * handle the chnage of input field
   */
  const handleParamInputChange = (e: any) => {
    const { name, value } = e.target;
    //convert camelCase to snake_case
    let convertedName = name.replace(/([A-Z])/g, "_$1").toLowerCase();
    let convertedQuery = activeQuery.replace(/([A-Z])/g, "_$1").toLowerCase();
    let newMsg = msg;
    newMsg[convertedQuery][convertedName] = value;
    onMsgChange(newMsg);
  };

  /**
   * handle the change in Msg
   */
  const changeMsg = (msg: MsgObject) => {
    setMsg(msg);
    console.log(msg);
    onMsgChange(msg);
  };

  /**
   * Fetching the input parameter using the queryInterface. Complete operation on strings using reg-ex.
   */
  const fetchInputParams = (query: string, queryInterface: QueryInterface) => {
    let convertedString = query.replace(/([A-Z])/g, "_$1").toLowerCase();

    // Find the message object from the schema Array
    const queryMessage = queryInterface?.properties.find(
      ({ name }) => name === query
    );

    if (queryMessage) {
      const { paramsArray, updatedMsg } = getInputs(
        queryMessage,
        convertedString
      );
      onResultChange(undefined);
      changeMsg(updatedMsg);
      setParams(paramsArray);
    }
  };

  /**
   * handle the dispatch of the query function
   */
  const handleAction = async () => {
    const tid = toast.loading("Query in process");
    try {
      const response = await sendQuery(msg);
      toast.update(tid, {
        type: "success",
        render: `Query is processed!`,
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });

      console.log(response);
      onResultChange(response);
    } catch (error) {
      console.log(error);

      toast.update(tid, {
        type: "error",
        render: `Query failed!`,
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
    }
  };

  return (
    <Flex minW={"35%"} flex={flex} flexDirection={"column"} gap={"10px"}>
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
          <ActionButton onClick={handleAction} name="Query" />
        </Flex>
      </form>
    </Flex>
  );
};

export default QueryForm;
