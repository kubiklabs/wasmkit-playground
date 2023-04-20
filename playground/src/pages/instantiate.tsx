import React from 'react';
import contractInfo from "../../src/counter.json";
// import { contractInfo } from '../types/configTypes';
interface contractInformation {
  [key: string]: {
    [key: string]: {
      deployInfo: {
        codeId: number;
        deployTimestamp: string;
      };
      instantiateInfo: {
        contractAddress: string;
        instantiateTimestamp: string;
      };
    };
  };
}
const info: contractInformation=(contractInfo);
function Instantiate(contractName: any="counter") {
//  console.log(contractName);
//  let t  = "counter";
 

// console.log(info);

 const contract:string = contractName['contractName']
//  console.log(info[contract]["testnet"]["deployInfo"]["codeId"]);
  return ( 
    <div className='instantiate-page'>
      {/* {contractName['contractName']} */}
      
      <br></br>
       <div>
     <p>code ID: </p>
    
      <p>{info[contract]["testnet"]["deployInfo"]["codeId"]}</p> 

      </div> 
      <br></br>
       
      <br></br>
      Contract Address : 
       {info[contract]["testnet"]["instantiateInfo"]["contractAddress"]}
      <br></br>

      
    </div>
  )
}

export default Instantiate;
