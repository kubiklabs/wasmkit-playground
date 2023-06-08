import {
  CosmWasmClient,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
} from "@cosmjs/cosmwasm-stargate";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { walletState } from "../context/walletState";
import { Contract } from "../hooks/clients/contract";
// import contractInfo from "../../src/counter.json";
import contractInfo from "../contracts/instantiateInfo/contractList.json";
import { ClassStructure, Property, Coin } from "../types/configTypes";
import Preview from "./preview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// const clas = require("../../src/counterInf.json");
const clas = require("../contracts/schema/contractSchema.json");
const stk = "StakingContract";
const count = "Counter";
function Query(contractName: any) {
  const contract = contractName["contractName"];
  
  const val = useRecoilValue(walletState);
  const [queryres, setqueryRes] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [askInp, setAskInp] = useState(false);
  const [askArr, setAskArr] = useState<{ name: string, type: string }[]>([]);

  

  // const CustomSelect = (item:any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    // const NoSelectionPromt = () => {
    //   window.alert('No option selected');
    // }
    interface MsgObject {
      [key: string]: {
        [key: string]: any;
      };
    }
    const [msg, setMsg] = useState<MsgObject>({
      [selectedOption]: {}
    });
    useEffect(() => {
      console.log("s");
      setSelectedOption("");
      setqueryRes("");
     // Reset the selected option when the options prop changes
    },[contractName]);
  // const interfaceName =
  //   contract === "counter" ? "CounterInterface" : "StakingContractInterface";
  // console.log(clas[contract]);
  // const classInfo = clas[contract] as ClassStructure[];
  
  if(Object.keys(contractInfo).length === 0 || Object.keys(clas).length === 0){
    return(
      <>
        No contracts compiled
      </>
    )
  }
  
  let words = contract.split('_');
  let capitalizedWords = words.map((word:any) => word.charAt(0).toUpperCase() + word.slice(1));
  let finalContractName = capitalizedWords.join('');


  const interfaceName = finalContractName+"Interface";
  const classInfo = clas[finalContractName+"Contract"]["schemaData"] as ClassStructure[];
   console.log("contract check", classInfo);
  // const className =
  //   contract === "counter"
  //     ? "CounterQueryContract"
  //     : "StakingContractQueryContract";
  const className = finalContractName+"QueryContract";
  const classStructure = classInfo.find((structure) => {
    return structure.kind === "class" && structure.name === className;
  });
  const interfaceStructure = classInfo.find((structure) => {
    return structure.kind === "interface" && structure.name === interfaceName;
  });

  const handleOutput = (item: string) =>{
    if (interfaceStructure && interfaceStructure.properties) {
      let indexx = 0;
      interfaceStructure.properties.forEach((val, index)=>{
        if(val.name === item){
          indexx = index
        }
      })      
      const str = interfaceStructure.properties[indexx].type;

      const match = str.match(/\{([^}]*)\}\s*:\s*\{([^}]*)\}[\s,]*?(?=,|\))/g);
  
      if (match) {
        setAskInp(true);
        const paramTypesArr: any[] = [];
      
        match.forEach((paramMatch: any) => {
          const [, paramNames, paramTypes] = paramMatch.match(/\{([^}]*)\}\s*:\s*\{([^}]*)\}/);
      
          const props = paramNames.trim().split(/,\s+/);
          const types = paramTypes.trim().split(/;\s+/);
      
          props.forEach((prop:any, i:any) => {
            const propName = prop.trim();
            const propType = types[i].trim().replace(/\?$/, '');
      
            paramTypesArr.push({name: propName, type: propType});
          });
        });
      
  
        console.log(paramTypesArr);
        setAskArr(paramTypesArr);
        // askArr = paramTypesArr;
        paramTypesArr.forEach((val)=>{
  
          const isOptional = val.type.includes("?");
          const typeName = val.type.split(":")[1].replace(/;$/, "").trim();
          console.log("val", val.name, isOptional, typeName);
        })

        let obj = paramTypesArr.reduce((acc:any, value:any, index: any) => {
          const isOptional = value.type.includes("?");
          const typeName = value.type.split(":")[1].replace(/;$/, "").trim();
          if(!isOptional && value.name !== "account"){
            let convertedString2 = (value.name).replace(/([A-Z])/g, '_$1').toLowerCase();
            console.log("check me out too", typeName, value.name)
            if(typeName === "number"){
              acc[convertedString2] = 0;
            }
            else acc[convertedString2] = "";
          }
          
          return acc;
        }, {});

        let convertedString = item.replace(/([A-Z])/g, '_$1').toLowerCase();

        const updatedMsg: MsgObject = {
          // ...msg,
          [convertedString]: obj
        };
        setMsg(updatedMsg);
  
      } else {
        console.log("Could not extract parameter object type string from input.");
      }
      
  // console.log(`${isOptional ? "optional " : "compulsary "}${typeName}`);
  
    }
  }
  
  

  let propertiesJsx = null;
  let prop: string[] = [];
  console.log("hehe", interfaceStructure)
  if (!classStructure) {
    return <div>Class {className} not found in JSON file.</div>;
  } else {
    if (!classStructure.properties || classStructure.properties.length === 0) {
      propertiesJsx = <div>Class {className} has no properties.</div>;
    } else {
      classStructure.properties.map((property) => prop.push(property.name));
    }
  }

  if (!interfaceStructure) {
    return <div>Class {className} not found in JSON file.</div>;
  } else {
    if (
      !interfaceStructure?.properties ||
      interfaceStructure.properties.length === 0
    ) {
    } else {
      propertiesJsx = (
        <div>
          {interfaceStructure?.properties.map((property) => (
            <div key={property.name}>
              <p>Property name: {property.name}</p>
              <p>Property type: {property["type"][4]}</p>
              {property.modifiers && property.modifiers.length > 0 && (
                <p>Property modifiers: {property.modifiers.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
      );
    }
  }
  // const msg = {
  //   get_count: {},
  // };

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (item :string) => {
    setSelectedOption(item);
    let convertedString = item.replace(/([A-Z])/g, '_$1').toLowerCase();
    
    const updatedMsg: MsgObject = {
      // ...msg,
      [convertedString]: {
        // ...msg[selectedOption],
        "": ""
      }
    };
    setMsg(updatedMsg);
    console.log("item", item);
    handleOutput(item);

    setIsOpen(false);
  };

  

  const query = async ()=>{
    // console.log("response", contractInfo.counter.contractAddress,temp);
  //  const ans = await temp.queryMsg({
  //   get_count: {}
  // });
    if(JSON.stringify(contractInfo) !== '{}'){
      const temp = new Contract(
        val.client as SigningCosmWasmClient,
        val.client as CosmWasmClient,
        (Object.keys(contractInfo).length === 0) ? "" :(contractInfo as Record<string, any>)[contract]?.contractAddress ,
      );
      const ans = await temp.queryMsg(msg);
      return ans;
    }
    return ""

  //  console.log("query response", ans, contractInfo.counter.contractAddress );
  }
  query();

  const handlebtnclick = async()=>{
    if(selectedOption === "")
    {
      window.alert('No option selected');
    }
    else
    {
    const res = await query();
    console.log("res", res);
    setqueryRes(JSON.stringify(res, null, 2));
    }
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedItem(event.target.value);
  }

  if(Object.keys(contractInfo).length === 0 || Object.keys(clas).length === 0){
    return(
      <>
        No contracts compiled
      </>
    )
  }

  return (
    <>
    <div className="query-page">
      {/* <p>Class ${className} found in JSON file.</p> */}
      {/* {propertiesJsx} */}

      {/* <button onClick={handlebtnclick}>Click to query </button> */}
      {/* {propertiesJsx} */}

      {/* <div>
           {queryres !== "" ?
           queryres
           :
           <></>
           }
         </div> */}
      <div className="menubar">
        <label htmlFor="menu">Select your query : </label>
        
        {/* <select
          id="menu"
          className="query-menu"
          value={selectedItem}
          onChange={handleSelect}
        >
          <option value="" selected disabled>
            Choose an option
          </option>
          {prop.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select> */}
        <div className="custom-select">
      <div className="select-selected" onClick={toggleDropdown}>
        {selectedOption ? selectedOption : "Select an option"}
        <div className="angleDown">
        <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </div>
      </div>
      {isOpen && (
        <div className="select-items">
          {prop.map((item) => (
            <div
              key={item}
              className="select-item"
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
    


        <p>You have selected: {selectedOption === "" ? "None" : selectedOption}</p>
         <div className="result">
         <button className="btn primary-btn" onClick={handlebtnclick}>Query </button>
         {queryres && (
        <div className="output-area">
          <label htmlFor="output">Query Outcome: </label>
          {/* <input id="output" value={queryres} readOnly /> */}
          <div id="outputquery" className="preview-box queryOutcome">
          <pre>{queryres}</pre>
            </div>
        </div>
      )}
        
         </div>

      </div>
      <Preview msg={msg}></Preview>
     


    </div>
    </>
  );
}

export default Query;
