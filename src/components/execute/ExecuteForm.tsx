import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import ActionButton from "../buttons/ActionButton";
import TextInput from "../inputs/TextInput";
import { useEffect, useState } from "react";
import { MsgObject } from "../../types/dataTypes";
import {
  camelToSnake,
  getTypesDefaultValue,
  toContractName,
} from "../../utils/helpers";
import contractSchema from "../../contracts/schema/contractSchema.json";
import { useParams } from "react-router-dom";
import { useReadSchema } from "../../hooks/useReadSchema";
import AddInput from "../inputs/AddInput";
import CustomTypeInputs from "../inputs/CustomTypeInputs";
import { useAction } from "../../hooks/useAction";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { networkContracts } from "../../context/networkContractState";
import { useReadConfig } from "../../hooks/useReadConfig";

type IContractSchema = typeof contractSchema;

const ExecuteForm = ({
  onMsgChange,
  flex,
  onResultChange,
}: {
  flex?: number;
  onMsgChange: (msg: MsgObject) => void;
  onResultChange: (msg: object) => void;
}) => {
  const { contractid } = useParams();

  const [queryList, setQueryList] = useState<string[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [params, setParams] = useState<any[]>([]);
  const [msg, setMsg] = useState<MsgObject>({});
  const [optionalMsg, setOptionalMsg] = useState<MsgObject>({});
  const [queryInterface, setQueryInterface] = useState<
    QueryInterface | undefined
  >(undefined);

  const [optionalArray, setOptionalArray] = useState<any[]>([]);
  const [optionalInputsArray, setOptionalInputsArray] = useState<any[]>([]);

  const { networkContractsList } = useRecoilValue(networkContracts);

  const { getActualContractName } = useReadConfig();

  const { getInputs } = useReadSchema(false);

  const { sendExecute } = useAction();

  interface QueryInterface {
    kind: string;
    name: string;
    properties: {
      name: string;
      type: string;
    }[];
  }

  useEffect(() => {
    constructorOnChange();
  }, [networkContractsList]);

  /**
   * Function to setup the query interface object when the contract list is popoulated.
   */

  const constructorOnChange = () => {
    if (networkContractsList !== undefined) {
      const contractName = toContractName(
        getActualContractName(contractid as string)
      );

      let queryInterface: QueryInterface | undefined;

      try {
        //get the Interface object from the schema arrray
        queryInterface = contractSchema[
          `${contractName}Contract` as keyof IContractSchema
        ].schemaData.find((item) => item.name === `${contractName}Interface`);
      } catch (error) {
        toast.error("Interface not found");
        console.log(error);
        return;
      }
      console.log(queryInterface);
      setQueryInterface(queryInterface);
      fetchQueryList(queryInterface as QueryInterface);
    }
  };

  /**
   * function to create the list of available execute msgs from the schema JSON
   */
  const fetchQueryList = (queryInterface: QueryInterface) => {
    //create the final array of execute msgs.
    console.log(queryInterface);

    const resultArray: string[] = queryInterface.properties.map(
      (property: any) => {
        return property.name;
      }
    );
    setQueryList(resultArray);
    setActiveQuery(resultArray[0]);
    fetchInputParams(resultArray[0], queryInterface);
  };

  /**
   * Fetching the input parameter using the queryInterface. Complete operation on strings using reg-ex.
   */
  const fetchInputParams = (query: string, queryInterface: QueryInterface) => {
    console.log(query);

    let convertedString = camelToSnake(query);
    //Find the message object from the schema Array
    console.log(queryInterface);

    const executeMessage = queryInterface?.properties.find(
      ({ name }) => name === query
    );

    console.log(executeMessage);

    if (executeMessage) {
      const { paramsArray, updatedMsg, optionalArray } = getInputs(
        executeMessage,
        convertedString
      );
      changeMsg({ msg: updatedMsg });
      setParams(paramsArray);
      setOptionalArray(optionalArray);
    }
  };

  /**
   * Functional to handle the addition of optional parameter
   */
  const handleOptionParams = (index: number) => {
    const optionName = optionalArray[index].name;
    let newMsg = optionalMsg;
    newMsg[optionName] = getTypesDefaultValue(optionalArray[index]?.type);
    setOptionalMsg(newMsg);
    onMsgChange({ ...msg, ...newMsg });

    const newOpInput = [...optionalInputsArray, optionalArray[index]];
    setOptionalInputsArray(newOpInput);

    let newOpArr = optionalArray;
    newOpArr.splice(index, 1);
    setOptionalArray(newOpArr);
  };

  /**
   * Functional to handle the removal of optional parameter
   */
  const handleRemoveOptionalItem = (index: number) => {
    const optionName = optionalInputsArray[index]?.name;
    let newMsg = optionalMsg;
    delete newMsg[optionName];
    setOptionalMsg(newMsg);
    onMsgChange({ ...msg, ...newMsg });

    const newOpArr = [...optionalArray, optionalInputsArray[index]];
    setOptionalArray(newOpArr);

    let newOpInput = optionalInputsArray;
    newOpInput.splice(index, 1);
    setOptionalInputsArray(newOpInput);
  };

  /**
   * Function to handle the updation of message object to show in preview
   */
  const changeMsg = (msg: MsgObject) => {
    setMsg(msg);
    onMsgChange(msg);
  };

  /**
   * Function to handle the change of selected inputs
   */
  const handleInputChange = (query: any) => {
    setOptionalInputsArray([]);
    setActiveQuery(query);
    fetchInputParams(query, queryInterface as QueryInterface);
  };

  /**
   * Function to handle the change of inputs of the necessary parameters
   */
  const handleParamInputChange = (e: any) => {
    const { name, value } = e.target;
    let typeVal = value;
    if (!isNaN(Number(value))) {
      typeVal = Number(value);
    }
    //convert camelCase to snake_case
    let convertedName = camelToSnake(name);
    let convertedQuery = camelToSnake(activeQuery);
    let newMsg = msg.msg;
    newMsg[convertedQuery][convertedName] = typeVal;
    onMsgChange({ msg: newMsg, ...optionalMsg });
  };

  /**
   * Function to handle the change of inputs of the optional parameters
   */
  const handleOptionalParamsChange = (
    name: string,
    value: any,
    optionName: string
  ) => {
    const convertedName = camelToSnake(name);
    let newMsg = optionalMsg;
    newMsg[optionName] = optionalMsg[optionName] || {};

    if (convertedName === camelToSnake(optionName)) {
      newMsg[optionName] = value;
    } else newMsg[optionName][convertedName] = value;
    setOptionalMsg(newMsg);
    onMsgChange({ ...msg, ...newMsg });
  };

  /**
   * Function to handle the dispatch of the execute message on click of the Execute Button
   */
  const handleSendExecute = async () => {
    const tid = toast.loading("Txn in process");
    try {
      const response = await sendExecute(msg.msg, optionalMsg);
      console.log(response);

      onResultChange(response as object);
      if (response) {
        toast.update(tid, {
          type: "success",
          render: `Txn is processed with hash ${response.transactionHash}!`,
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        });
      } else {
        toast.update(tid, {
          type: "error",
          render: `Txn failed!`,
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      // onResultChange(error as Error);

      toast.update(tid, {
        type: "error",
        render: `Txn failed!`,
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
    }
  };

  return (
    <Flex minW={"35%"} flex={flex} flexDirection={"column"} gap={"10px"}>
      <form>
        <Flex alignItems={"end"} flexDirection={"column"} gap={"20px"}>
          <SelectInput
            onChange={handleInputChange}
            label="Select Command"
            inputList={queryList}
          />
          {optionalArray.length ? (
            <Flex
              gap={"20px"}
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
          {optionalInputsArray.length ? (
            <Accordion width={"100%"} defaultIndex={[0]} allowMultiple>
              <AccordionItem borderTop={"none"}>
                <h2>
                  <AccordionButton
                    _focusVisible={{
                      outline: "none",
                    }}
                    _focus={{
                      outline: "none",
                    }}
                    border={"none"}
                  >
                    <Box
                      _focusVisible={{
                        outline: "none",
                      }}
                      as="span"
                      flex="1"
                      textAlign="left"
                    >
                      Optional Params
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel p={"0"} pb={4}>
                  {optionalInputsArray.length ? (
                    <Flex
                      borderRadius={"10px"}
                      width={"100%"}
                      gap={"20px"}
                      flexWrap={"wrap"}
                      p={"10px"}
                      bg={"#ffffff09"}
                    >
                      {optionalInputsArray.map((param, index) => {
                        return (
                          <>
                            <Flex width={"100%"} gap={"5px"}>
                              <CustomTypeInputs
                                onInputChange={(name, value) =>
                                  handleOptionalParamsChange(
                                    name,
                                    value,
                                    param.name
                                  )
                                }
                                type={param.type}
                                key={param.name}
                                label={param.name}
                              />
                              <Tooltip label={`Remove ${param.name}`}>
                                <FontAwesomeIcon
                                  onClick={() =>
                                    handleRemoveOptionalItem(index)
                                  }
                                  size="xs"
                                  icon={faMinus}
                                  cursor={"pointer"}
                                  style={{
                                    transform: "scale(0.7)",
                                    borderRadius: "20px",
                                    padding: "4px 5px",
                                    border: "2px solid #ffffff70",
                                  }}
                                />
                              </Tooltip>
                            </Flex>
                            {index + 1 !== optionalInputsArray.length ? (
                              <Divider borderColor={"#ffffff90"} />
                            ) : null}
                          </>
                        );
                      })}
                    </Flex>
                  ) : null}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : null}

          {params.length ? (
            <Flex
              borderRadius={"10px"}
              border={"1px solid #ffffff29"}
              p={"10px"}
              width={"100%"}
              columnGap={"20px"}
              flexWrap={"wrap"}
            >
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

          <ActionButton onClick={handleSendExecute} name="Execute" />
        </Flex>
      </form>
    </Flex>
  );
};

export default ExecuteForm;
