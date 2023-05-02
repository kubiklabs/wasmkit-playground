import {
  CosmWasmClient,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
} from "@cosmjs/cosmwasm-stargate";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Contract } from "../hooks/clients/contract";
import contractInfo from "../../src/counter.json";
import { walletState } from "../context/walletState";
import Preview from "./preview";
import { ClassStructure, Property, Coin } from "../types/configTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
  const [selectedOption, setSelectedOption] = useState("");
  const classStructure = classInfo.find((structure) => {
    return structure.kind === "class" && structure.name === className;
  });
  const interfaceStructure = classInfo.find((structure) => {
    return structure.kind === "interface" && structure.name === interfaceName;
  });
  console.log("class ", interfaceStructure);
  // console.log("class srinc", classStructure?.properties,"\n");
  useEffect(() => {
    console.log("s");
    setSelectedOption("");
   // Reset the selected option when the options prop changes
  },[contractName]);


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
  const temp = new Contract(
    val.client as SigningCosmWasmClient,
    val.client as CosmWasmClient,
    contractInfo.counter.testnet.instantiateInfo.contractAddress
  );
  const transferAmt: readonly Coin[] = [
    {
      denom: "ujunox",
      amount: "1",
    },
  ];
  const msg = {
    increment: { },
  };
  const incre = async () => {
    // console.log("response", contractInfo.counter.testnet.instantiateInfo.contractAddress,temp);
    const ans = await temp.executeMsg(
      msg,
      val.address as string
    );
    //  console.log("increment response", ans, contractInfo.counter.testnet.instantiateInfo.contractAddress);
    return ans;
  };
  // incre();

  const handlebtnclick = async () => {
    const res = await incre();
    // console.log("sss");
    // console.log("as",res["transactionHash"]);
    setexeRes(res["transactionHash"] as string);
  };

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedItem(event.target.value);
  }
 
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (item :string) => {
    setSelectedOption(item);
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

        <p>You have selected: {selectedOption === "" ? "None" : selectedOption}</p>
        <div className="result">
           <button className="btn primary-btn" onClick={handlebtnclick}>Click to increment </button>
           {exeRes && (
        <div className="output-area">
          <label htmlFor="output" >Transaction Hash: </label>
          <input id="output" className="exe-op" value={exeRes} readOnly />
        </div>
      )}
         </div>
      </div>

      <Preview msg={msg}></Preview>
    </div>
  );
}

export default Execute;
