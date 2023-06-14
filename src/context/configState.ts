import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { ChainInfo, contractInfo } from "../types/configTypes";

import junoMainnetChainInfo from "../config/uni-6/chain_info.json";


import junoTestnetChainInfo from "../config/uni-6/chain_info.json";

import injectiveTestnetChainInfo from "../config/uni-6/chain_info.json";

import uni6 from "../config/uni-6/chain_info.json";
import { useEffect } from "react";

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


  const chainInfo = (network === "uni6")? uni6: pion1;
  console.log("network in configstate", network);

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
