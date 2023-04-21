import { CosmWasmClient, SigningCosmWasmClient, SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isPropertyAccessChain } from 'typescript';
// import ClassInfo from "../../src/counterInf.json";
import { walletState } from "../context/walletState";
import { Contract } from "../hooks/clients/contract"
import contractInfo from "../../src/counter.json";
import { ClassStructure, Property, Coin } from "../types/configTypes";

const clas = require("../../src/counterInf.json");
const stk = "StakingContract";
const count="Counter";
// import { CounterQueryContract } from "../method"
function Query(contractName: any) {
  
  const contract = contractName["contractName"]
  // console.log(clas[contract]);
  const classInfo = clas[contract] as ClassStructure[];
  //  console.log(contract);
  const className = (contract === "counter") ? "CounterQueryContract": "StakingContractQueryContract" ;
const classStructure = classInfo.find((structure) => {
  return structure.kind === "class" && structure.name === className;
});
const val = useRecoilValue(walletState);
const [queryres, setqueryRes] = useState("");
const [selectedItem, setSelectedItem] = useState('');

let propertiesJsx = null;
let prop:string[] =[];
if (!classStructure) {
  return <div>Class {className} not found in JSON file.</div>;
} else {
 

  if (!classStructure.properties || classStructure.properties.length === 0) {
    propertiesJsx = <div>Class {className} has no properties.</div>;
  } else {

    classStructure.properties.map((property) => (
         prop.push(property.name)
    )
    // propertiesJsx = (
    //   <div>
    //     {classStructure.properties.map((property) => (
          
    //       <div key={property.name}>
    //         <p>Property name: {property.name}</p>
    //         {/* <p>Property type: {property.type}</p> */}
    //         {property.modifiers && property.modifiers.length > 0 && (
    //           <p>Property modifiers: {property.modifiers.join(", ")}</p>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    );
  }
}
const msg =
{
  get_count: {}
}

const temp = new Contract(val.client as SigningCosmWasmClient,val.client as CosmWasmClient,contractInfo.counter.testnet.instantiateInfo.contractAddress);

// const query = async ()=>{
//   console.log("response", contractInfo.counter.testnet.instantiateInfo.contractAddress,temp);
//  const ans = await temp.queryMsg({
//   get_count: {}
// });
//  console.log("query response", ans, contractInfo.counter.testnet.instantiateInfo.contractAddress);
//  return ans;
// }
// query();

// const handlebtnclick = async()=>{
//   const res = await query();
//   setqueryRes(res.count as string);
// }



 

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedItem(event.target.value);
  }



  return ( 
    <div className='query-page'>

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

         <label htmlFor="menu">Select an item:</label>
      <select id="menu" value={selectedItem} onChange={handleSelect}>
      <option value="" selected disabled>Choose an option</option>
           {prop.map((item) => (
            <option key={item}>{item}</option>
          ))}
        
      </select>
      <p>You have selected: {selectedItem === "" ? "None" : selectedItem}</p>

    </div>
  )
}

export default Query;
