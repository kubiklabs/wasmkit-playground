import { ChainInfo } from "../types/configTypes";

export const useChainInfo = () => {
  /*
   * Returns the chainInfo data of the provided chain
   */
  const getChainInfoData = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    console.log("chaininfooo", chainInfo);
    return chainInfo;
  };

  /*
   * Returns the chainId of the provided chain
   */
  const getChainId = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.chainId;
  };

  /*
   * Returns the RPC url of the provided chain
   */
  const getRpcUrl = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.rpc;
  };

  /*
   * Returns the REST url of the provided chain
   */
  const getRestUrl = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.rest;
  };

  /*
   * Returns the display denom of the provided chain
   */

  const getDenomName = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.stakeCurrency.coinDenom;
  };

  /*
   * Returns the actual denom of the provided chain
   */

  const getMinimalDenomName = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.stakeCurrency.coinMinimalDenom;
  };

  /*
   * Returns the actual denom of the provided chain
   */

  const getAccAddrPrefix = async (chainId: string) => {
    const chainInfo = await import(`../config/${chainId}/chain_info.json`);

    return (chainInfo as ChainInfo)?.bech32Config.bech32PrefixAccAddr;
  };

  return {
    getChainInfoData,
    getChainId,
    getRpcUrl,
    getRestUrl,
    getDenomName,
    getMinimalDenomName,
    getAccAddrPrefix,
  };
};
