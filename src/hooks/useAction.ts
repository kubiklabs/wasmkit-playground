import { useRecoilValue } from "recoil";
import { MsgObject } from "../types/dataTypes";
import { walletState } from "../context/walletState";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { activeNetworkState } from "../context/networkContractState";
import contractList from "../contracts/instantiateInfo/contractList.json";

export const useAction = () => {
  const { queryClient } = useRecoilValue(walletState);
  const { contractid } = useParams();

  const { address } = useRecoilValue(walletState);
  const { activeNetworkId } = useRecoilValue(activeNetworkState);

  const sendQuery = async (queryMsg: MsgObject) => {
    if (!address) {
      toast.error("Connect Wallet before Querying!");
      return;
    }

    console.log(contractList, contractid);

    const contractAddress = (
      Object.values(contractList[contractid as keyof typeof contractList]).find(
        (network) => network.chainId === activeNetworkId
      ) as any
    )?.contractAddress;

    if (!contractAddress) {
      toast.error(
        "Contract address not found. Contract is possibly not instantiated."
      );
      return;
    }

    try {
      const response = await queryClient?.queryContractSmart(
        contractAddress,
        queryMsg
      );
      return response;
    } catch (error) {}
  };

  return { sendQuery };
};
