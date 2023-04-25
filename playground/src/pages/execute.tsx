import {
  CosmWasmClient,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
} from "@cosmjs/cosmwasm-stargate";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { isPropertyAccessChain } from "typescript";
// import ClassInfo from "../../src/counterInf.json";
import { Contract } from "../hooks/clients/contract";
import contractInfo from "../../src/counter.json";
import { walletState } from "../context/walletState";
import Preview from "./preview";
import { ClassStructure, Property, Coin } from "../types/configTypes";

const clas = require("../../src/counterInf.json");

// import { CounterQueryContract } from "../method"
function Execute(contractName: any) {
  const contract = contractName["contractName"];
  const className =
    contract === "counter" ? "CounterContract" : "StakingContractContract";
  const interfaceName =
    contract === "counter" ? "CounterInterface" : "StakingContractInterface";
  const classInfo = clas[contract] as ClassStructure[];
  const val = useRecoilValue(walletState);
  const [increres, setincreRes] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const classStructure = classInfo.find((structure) => {
    return structure.kind === "class" && structure.name === className;
  });
  const interfaceStructure = classInfo.find((structure) => {
    return structure.kind === "interface" && structure.name === interfaceName;
  });
  console.log("class ", interfaceStructure);
  // console.log("class srinc", classStructure?.properties,"\n");

  let propertiesJsx = null;
  let prop: string[] = [];
  if (!classStructure) {
    return <div>Class {className} not found in JSON file.</div>;
  } else {
    if (!classStructure.properties || classStructure.properties.length === 0) {
      propertiesJsx = <div>Class {className} has no properties.</div>;
    } else {
      classStructure.properties.map((property) => prop.push(property.name));

      // propertiesJsx = (
      //   <div>
      //     {interfaceStructure.properties.map((property) => (
      //       <div key={property.name}>
      //         <p>Property name: {property.name}</p>
      //         {/* <p>Property type: {property.type}</p> */}
      //         {property.modifiers && property.modifiers.length > 0 && (
      //           <p>Property modifiers: {property.modifiers.join(", ")}</p>
      //         )}
      //       </div>
      //     ))}
      //   </div>
      // );
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
  const incre = async () => {
    // console.log("response", contractInfo.counter.testnet.instantiateInfo.contractAddress,temp);
    const ans = await temp.executeMsg(
      {
        reset: { count: 103 },
      },
      val.address as string
    );
    //  console.log("increment response", ans, contractInfo.counter.testnet.instantiateInfo.contractAddress);
    return ans;
  };
  // incre();

  const handlebtnclick = async () => {
    const res = await incre();
    setincreRes(res.increment as string);
  };

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedItem(event.target.value);
  }
  const msg = {
    reset: { count: 103 },
  };
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
      <div className="menubar">
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
      </div>

      {/* <div className="template"> */}
      <Preview msg={msg}></Preview>
      {/* </div> */}
    </div>
  );
}

export default Execute;
