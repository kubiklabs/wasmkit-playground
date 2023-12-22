import { useSetRecoilState } from "recoil";
import contractList from "../contracts/instantiateInfo/contractList.json";
import {
  activeNetworkState,
  networkContracts,
} from "../context/networkContractState";

import { useConnectWallet } from "../hooks/useTxnClient";

export const useNetworkConfig = () => {
  const setNetworkContractState = useSetRecoilState(networkContracts);
  const setActiveNetwork = useSetRecoilState(activeNetworkState);

  const connectWallet = useConnectWallet();

  const contractEntries = Object.entries(contractList);
  const contractsNameOnly = Object.keys(contractList);

  //creates and returns the list of of all chains and contract under each chain
  const getNetworkContractsConfig = () => {
    let networkContractConfig: any = {};
    contractEntries.forEach(([name, data]) => {
      const addresses = Object.entries(data);
      // console.log(name, data);
      addresses.forEach(([, innerData]) => {
        const contracts: any[] = networkContractConfig[innerData.chainId]
          ? networkContractConfig[innerData.chainId]
          : [];
        const newElement = (innerData as any).contractTag || "";
        let newConfig = {
          ...networkContractConfig,
          [innerData.chainId]: [...contracts, { name, tagName: newElement }],
        };
        networkContractConfig = newConfig;
      });
    });
    console.log(networkContractConfig);

    return networkContractConfig;
  };

  const getContractsList = () => {
    return contractsNameOnly;
  };

  const setNetworkContractsConfig = () => {
    const config = getNetworkContractsConfig();
    setNetworkContractState({
      networkContractsList: config,
    });
    switchActiveNetwork(Object.keys(config)[0]);
  };

  const switchActiveNetwork = async (chainId: string) => {
    setActiveNetwork({
      activeNetworkId: chainId,
      isLoggingIn: true,
    });
    await connectWallet(chainId);
    setActiveNetwork({
      activeNetworkId: chainId,
      isLoggingIn: false,
    });
    console.log("Network switched to " + chainId);
  };

  return {
    getNetworkContractsConfig,
    getContractsList,
    setNetworkContractsConfig,
    switchActiveNetwork,
  };
};
