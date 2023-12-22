import { useRecoilValue } from "recoil";
import { MsgObject } from "../types/dataTypes";
import { walletState } from "../context/walletState";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { activeNetworkState } from "../context/networkContractState";
import contractList from "../contracts/instantiateInfo/contractList.json";
import { StdFee } from "@cosmjs/stargate";
import { useReadConfig } from "./useReadConfig";

const defaultFee: StdFee = {
  amount: [{ amount: "200000", denom: "umlg" }],
  gas: "200000",
};

export const useAction = () => {
  const { queryClient } = useRecoilValue(walletState);
  const { contractid } = useParams();

  const { address, client } = useRecoilValue(walletState);
  const { activeNetworkId } = useRecoilValue(activeNetworkState);

  const { getActualContractName } = useReadConfig();

  const sendQuery = async (queryMsg: MsgObject) => {
    if (!address) {
      toast.error("Connect Wallet before Querying!");
      return;
    }
    const contractAddress = (
      Object.values(
        contractList[
          getActualContractName(
            contractid as string
          ) as keyof typeof contractList
        ]
      ).find((network) => network.chainId === activeNetworkId) as any
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

  const sendExecute = async (executeMsg: MsgObject, optionalParams: any) => {
    if (!address) {
      toast.error("Connect Wallet before executing txn!");
      return;
    }

    console.log(contractList, contractid);

    const contractAddress = (
      Object.values(
        contractList[
          getActualContractName(
            contractid as string
          ) as keyof typeof contractList
        ]
      ).find((network) => network.chainId === activeNetworkId) as any
    )?.contractAddress;

    if (!contractAddress) {
      toast.error(
        "Contract address not found. Contract is possibly not instantiated."
      );
      return;
    }

    let customFees = {
      amount: defaultFee.amount,
      gas: defaultFee.gas,
    };

    if (optionalParams.customFees) {
      let amounts = optionalParams.customFees.amount;
      if (amounts.length) {
        const filteredArray = amounts.filter(
          (obj: object) => Object.keys(obj).length > 0
        );
        if (filteredArray.length) {
          customFees.amount = filteredArray;
        }
      }
      if (optionalParams.customFees.gas) {
        customFees.gas = optionalParams.customFees.gas;
      }
    }

    let transferAmount = [];

    if (optionalParams.transferAmount) {
      let amounts = optionalParams.transferAmount.transfer_amount;
      if (amounts.length) {
        const filteredArray = amounts.filter(
          (obj: object) => Object.keys(obj).length > 0
        );
        if (filteredArray.length) {
          transferAmount = filteredArray;
        }
      }
    }
    let memo = optionalParams?.memo?.memo || "";
    console.log(memo);

    // try {
    const response = await client?.execute(
      address,
      contractAddress,
      executeMsg,
      customFees,
      memo,
      transferAmount
    );
    console.log(response);

    toast.success(`Transaction successfully executed `);
    return response;
    // } catch (error) {
    //   toast.error(
    //     `Transaction failed with message ${(error as Error).message}`
    //   );
    //   console.log(error);
    // }
  };

  return { sendQuery, sendExecute };
};
