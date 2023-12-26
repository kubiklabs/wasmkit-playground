import { useRecoilValue } from "recoil";
import contractList from "../contracts/instantiateInfo/contractList.json";
import {
  activeNetworkState,
  networkContracts,
} from "../context/networkContractState";
import { sleep } from "../utils/helpers";

export const useReadConfig = () => {
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  const { networkContractsList } = useRecoilValue(networkContracts);

  const getActualContractName = (tagName: string) => {
    // while (networkContractsList === undefined) {
    //   sleep(1);
    // }

    let name = tagName;
    if (!contractList[name as keyof typeof contractList])
      name = networkContractsList?.[activeNetworkId]?.find(
        (item: any) => item.tagName === tagName
      )?.name;
    return name;
  };

  const getContractDetails = (contractName: string) => {
    // let name = contractName;
    // if (!contractList[name as keyof typeof contractList])
    //   name = networkContractsList[activeNetworkId]?.find(
    //     (item: any) => item.tagName
    //   ).name;

    let name = getActualContractName(contractName);

    const details = Object.values(
      contractList[name as keyof typeof contractList]
    )?.find((item) => item.chainId === activeNetworkId);
    console.log(details);

    return details;
  };
  return { getContractDetails, getActualContractName };
};
