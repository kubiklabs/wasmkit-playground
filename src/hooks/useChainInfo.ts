import { useRecoilValue } from "recoil";
import { configState } from "../context/configState";

export const useChainInfo = () => {
  const { chainInfo } = useRecoilValue(configState);

  /*
   * Returns the chainInfo data of secret chain
   */
  const getChainInfoData = () => {
    console.log("chaininfooo", chainInfo)
    return chainInfo;
  };

  /*
   * Returns the chainId of secret chain
   */
  const getChainId = () => {
    return chainInfo.chainId;
  };

  /*
   * Returns the RPC url of secret chain
   */
  const getRpcUrl = () => {
    return chainInfo.rpc;
  };

  /*
   * Returns the REST url of secret chain
   */
  const getRestUrl = () => {
    return chainInfo.rest;
  };

  const getDenomName = () =>{
    return chainInfo.stakeCurrency.coinDenom
  }

  return {
    getChainInfoData,
    getChainId,
    getRpcUrl,
    getRestUrl,
    getDenomName,
  };
};
