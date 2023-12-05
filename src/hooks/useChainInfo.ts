// import { useRecoilValue } from "recoil";
// import { configState } from "../context/configState";

import { useEffect, useState } from "react";
import { ChainInfo } from "../types/configTypes";

export const useChainInfo = () => {
  // const [chainInfo, setChainInfo] = useState<ChainInfo>();

  // useEffect(() => {
  //   fetchChainInfo();
  // }, [chainId]);

  const fetchChainInfo = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);
    // setChainInfo(chainInfo);
    console.log(chainInfo);
  };
  // const { chainInfo } = useRecoilValue(configState);

  /*
   * Returns the chainInfo data of secret chain
   */
  const getChainInfoData = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    console.log("chaininfooo", chainInfo);
    return chainInfo;
  };

  /*
   * Returns the chainId of secret chain
   */
  const getChainId = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.chainId;
  };

  /*
   * Returns the RPC url of secret chain
   */
  const getRpcUrl = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.rpc;
  };

  /*
   * Returns the REST url of secret chain
   */
  const getRestUrl = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.rest;
  };

  const getDenomName = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.stakeCurrency.coinDenom;
  };

  return {
    getChainInfoData,
    getChainId,
    getRpcUrl,
    getRestUrl,
    getDenomName,
  };
};
