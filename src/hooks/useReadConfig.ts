import { useRecoilValue } from "recoil";
import contractList from "../contracts/instantiateInfo/contractList.json";
import { activeNetworkState } from "../context/networkContractState";
export const useReadConfig = () => {
  const { activeNetworkId } = useRecoilValue(activeNetworkState);

  const getContractDetails = (contractName: string) => {
    const details = Object.values(
      contractList[contractName as keyof typeof contractList]
    ).find((item) => item.chainId === activeNetworkId);
    console.log(details);

    return details;
  };
  return { getContractDetails };
};
