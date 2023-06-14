import { atom } from "recoil";
import contractList from "../contracts/instantiateInfo/contractList.json";

// const defaultChainId = Object.values(contractList)[0]?.default?.chainId || '';


let defaultChainId = "";

const list = Object.keys(contractList);

let firstValue: any = Object.values(contractList)[0];

list.forEach((item, index)=>{
  if(index===0){
    if(firstValue === undefined || firstValue === null){
      firstValue = {
        
      }
    }
    const temp: any = (Object.values(firstValue)[index]);
    defaultChainId = ((temp["chainId"]).replace(/-/g,''));
  }
})

export const networkState = atom<{
  network: string;
}>({

  key: "networkState",
  default: {
    network: (localStorage.getItem("WKnetworkState") !== null)? localStorage.getItem("WKnetworkState") as string: defaultChainId,
  },
  dangerouslyAllowMutability: true,
});


export const networkArrayState = atom<{
  networkArray: string[];
}>({
  key: "networkArrayState",
  default: {
    // network: (localStorage.getItem("networkState") !== null)? localStorage.getItem("networkState") as string: "JunoTestnet",
    networkArray: [defaultChainId],
  },
  dangerouslyAllowMutability: true,
});


