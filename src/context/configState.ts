import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { ChainInfo, contractInfo } from "../types/configTypes";

import { useEffect } from "react";
import uni6 from "../config/uni-6/chain_info.json";
import constantine2 from "../config/constantine-2/chain_info.json";
import injective888 from "../config/injective-888/chain_info.json";
import juno1 from "../config/juno-1/chain_info.json";
import neutron1 from "../config/neutron-1/chain_info.json";
import osmotest4 from "../config/osmo-test-4/chain_info.json";
import osmosis1 from "../config/osmo-test-4/chain_info.json";
import pion1 from "../config/pion-1/chain_info.json";


const readConfig = () => {
  // let network: string = "JunoMainnet";
  let network: string = "uni6";
  console.log("i am here");
  if (localStorage.getItem("WKnetworkState") !== null) {
    network = localStorage.getItem("WKnetworkState") as string;
  }

  // TODO: on the drop down menu, apply one method
  // which updates the config recoil state on network selection
  // that reads the network variable from recoil and it reflected in the app


  let chainInfo = uni6;
    if(network === "uni6"){
      chainInfo = uni6;
    }
    else if(network === "pion1"){
      chainInfo = pion1;
    }
    else if(network === "osmosis1"){
      chainInfo = osmosis1;
    }
    else if(network === "osmotest4"){
      chainInfo = osmotest4;
    }
    else if(network === "neutron1"){
      chainInfo = neutron1;
    }
    else if(network === "juno1"){
      chainInfo = juno1;
    }
    else if(network === "injective888"){
      chainInfo = injective888;
    }
    else if(network === "constantine2"){
      chainInfo = constantine2;
    }
  console.log("network in configstate", network, chainInfo);

  // const otherContracts = (network === "JunoMainnet")? junoMainnetOtherContracts: junoMainnetOtherContracts;

  let otherContractsMap: Record<string, contractInfo> = {};
  // Object.entries(otherContracts).forEach(([contractName, value]) => {
  //   otherContractsMap[contractName] = value;
  // });

  return {
    disclaimerSeen: false,
    tourSeen: false,
    chainInfo: chainInfo,
    otherContractsMap: otherContractsMap,
  };
};

export const configState = atom<{
  disclaimerSeen: boolean;
  tourSeen: boolean;
  chainInfo: ChainInfo;
  otherContractsMap: Record<string, contractInfo>;
}>({
  key: "configState",
  default: readConfig(),
  dangerouslyAllowMutability: true,
});
