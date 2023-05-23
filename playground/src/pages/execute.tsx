import {
  CosmWasmClient,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
} from "@cosmjs/cosmwasm-stargate";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PulseLoader from "react-spinners/PulseLoader";
import { Contract } from "../hooks/clients/contract";
import contractInfo from "../../src/counter.json";
import { walletState } from "../context/walletState";
import Preview from "./preview";
import { ClassStructure, Property, Coin } from "../types/configTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleLoader, FadeLoader } from "react-spinners";
const clas = require("../../src/counterInf.json");
function Execute(contractName: any) {
  const contract = contractName["contractName"];
  const className =
    contract === "counter" ? "CounterContract" : "StakingContractContract";
  const interfaceName =
    contract === "counter" ? "CounterInterface" : "StakingContractInterface";
  const classInfo = clas[contract] as ClassStructure[];
  const val = useRecoilValue(walletState);
  const [exeRes, setexeRes] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [askInp, setAskInp] = useState(false);
  const [askArr, setAskArr] = useState<{ name: string, type: string }[]>([]);
  // let askArr: { name: string, type: string }[] = [];

  interface MsgObject {
    [key: string]: {
      [key: string]: any;
    };
  }
  const [msg, setMsg] = useState<MsgObject>({
    [selectedOption]: {}
  });

  const classStructure = classInfo.find((structure) => {
    return structure.kind === "class" && structure.name === className;
  });
  const interfaceStructure = classInfo.find((structure) => {
    return structure.kind === "interface" && structure.name === interfaceName;
  });
  console.log("class ", interfaceStructure);

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
  

  // console.log("class srinc", classStructure?.properties,"\n");
  useEffect(() => {
    console.log("s");
    setSelectedOption("");
    setexeRes("");
    // Reset the selected option when the options prop changes
  }, [contractName]);
  useEffect(() => {
    console.log("s");
    // setSelectedOption("");
    setexeRes("");
    // Reset the selected option when the options prop changes
  }, [selectedOption]);

  let propertiesJsx = null;
  let prop: string[] = [];
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
  // console.log("valaddresss", val.address, val.client)
  console.log("something", propertiesJsx);
  // console.log("something 2", propertiesJsx['increment'])

  const temp = new Contract(
    val.client as SigningCosmWasmClient,
    val.client as CosmWasmClient,
    contract === "counter" ? contractInfo.counter.testnet.instantiateInfo.contractAddress : contractInfo.staking.testnet.instantiateInfo.contractAddress
  );
  const transferAmt: readonly Coin[] = [
    {
      denom: "ujunox",
      amount: "1",
    },
  ];
console.log(askArr)

  const incre = async () => {

    const ans = await temp.executeMsg(msg, val.address as string);
    return ans;
  };


  const handleInputChange = (name: any, value: any, typeName: any) => {

    console.log("check it out", name, typeName, Number(value), typeof(value))
    let convertedString3 = name.replace(/([A-Z])/g, '_$1').toLowerCase();

let convertedString = selectedOption.replace(/([A-Z])/g, '_$1').toLowerCase();

    if(typeName === "number"){
      const updatedMsg: MsgObject = {
        // ...msg,
        [convertedString]: {
          ...msg[convertedString],
          [convertedString3]: Number(value)
        }
      };
      setMsg(updatedMsg);
    }
    else {
      const updatedMsg: MsgObject = {
        // ...msg,
        [convertedString]: {
          ...msg[convertedString],
          [convertedString3]: value
        }
      };
      setMsg(updatedMsg);
    }

  };

  const handlebtnclick = async () => {
    setIsLoading(true);
    const res = await incre();
    console.log("response", res)
    // console.log("sss");

    toast.success("Output is now displayed!");
    setexeRes(res["transactionHash"] as string);
    setIsLoading(false);
  };

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedItem(event.target.value);
  }

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (item: string) => {
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
  // console.log(exeRes);
  return (
    <div className="execute-page">
      {/* <p>Class ${className} found in JSON file.</p> */}
      {/* <div className="test">{propertiesJsx}</div> */}

      {/* <button onClick={handlebtnclick}>Click to increment </button> */}
      {/* {propertiesJsx} */}

      {/* <div>
           {increres !== "" ?
           increres
           :
           <></>
           }
         </div> */}
      {/* <div className="menubar">
        <label htmlFor="menu">Select to execute: </label>
        <select id="menu" value={selectedItem} onChange={handleSelect}>
          <option value="" selected disabled>
            Choose an option
          </option>
          {prop.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <p>You have selected: {selectedItem === "" ? "None" : selectedItem}</p>
      </div> */}
      <div className="menubar">
        <label htmlFor="menu">Select command to execute : </label>
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

        <p>
          You have selected: {selectedOption === "" ? "None" : selectedOption}
        </p>
        <div className="result">
          {/* {askInp? */}
          <div>
            {askInp ?
              <div className="input-field-container">
                  {
              askArr.map((valu)=>{
                const isOptional = valu.type.includes("?");
                const typeName = valu.type.split(":")[1].replace(/;$/, "").trim();
                return <div className="input-field">
                <div className="input-field-name">{valu.name }{isOptional ? " (Optional)":""}</div>
                {/* <div></div> */}
                {
                valu.name === "account" ?
                // <div>{val.shortAddress}</div>
                <div className="poolSearch">
                <input placeholder={typeName} value={val.address} disabled></input>
                </div>
                :
                <div className="poolSearch">
                <input placeholder={typeName}
                onChange={(e) => handleInputChange(valu.name, e.target.value, typeName)}
                >

                </input>
                </div>
                }
                </div>
              })
              
            }
                </div>
              :
              <></>
            }
          </div>
          {/* :
          <></>
          } */}
          {/* <button className="btn primary-btn" onClick={handlebtnclick}>Click to increment </button> */}
          {/* {exeRes && (
        <div className="output-area">
          <label htmlFor="output" >Transaction Hash: </label>
          <input id="output" className="exe-op" value={exeRes} readOnly />
        </div>
      )} */}
          {isLoading ? (
            <FadeLoader
              color="#1790FF"
              loading={true}
              // cssOverride={override}
              //size={100}
              height={10}
              width={5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : exeRes !== "" ? (
            <>
              <div className="output-area">
                <label htmlFor="output">Transaction Hash: </label>
                {/* <input className="" value={exeRes} readOnly /> */}
                <div id="outputquery" className="preview-box queryOutcome">
                  {exeRes}
                </div>
              </div>
            </>
          ) : (
            <>
              <button className="btn primary-btn" onClick={handlebtnclick}>
                Execute{" "}
              </button>
            </>
          )}
        </div>
      </div>

      <Preview msg={msg}></Preview>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Execute;
