import React from 'react';
import contractInfo from "../../src/counter.json";
// import { contractInfo } from '../types/configTypes';
import { contractInformation } from '../types/configTypes';
import Headlines from './headlines';
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
       {/* <div className='code'> */}
         <Headlines heading='Code ID' subheading={info[contract]["testnet"]["deployInfo"]["codeId"]}></Headlines>
        {/* <p>code ID: </p>
    
      <p>{info[contract]["testnet"]["deployInfo"]["codeId"]}</p>  */}
          <br></br>
      {/* </div>  */}
        <Headlines heading="Contract Address" subheading={info[contract]["testnet"]["instantiateInfo"]["contractAddress"]}></Headlines>
      {/* Contract Address : 
       
      <br></br> */}

      
    </div>
  )
}

export default Instantiate;
