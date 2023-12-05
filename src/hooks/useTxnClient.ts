// import React, { useState, useEffect, useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { walletState } from "../context/walletState";
// import { networkConstants } from "../utils/constants";
import { coinConvert, sleep } from "../utils/helpers";
// import { UserContext } from "../context/userState";
import { useMessageToaster } from "./useMessageToaster";
import { toast } from "react-toastify";
import { useChainInfo } from "./useChainInfo";
// import { networkState } from "../context/networkState";
import { activeNetworkState } from "../context/networkContractState.";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useDisconnetWallet = () => {
  const setWalletState = useSetRecoilState(walletState);
  const { Success } = useMessageToaster();
  return () => {
    /*
     *Change Login status in the local storage
     */
    sessionStorage.setItem("isLoggedIn", "false");
    /*
     *Reset the wallet state
     */
    setWalletState({
      client: undefined,
      address: undefined,
      shortAddress: undefined,
      balance: undefined,
      nickName: undefined,
    });
    Success("Wallet Disconnected!");
  };
};

export const useConnectWallet = () => {
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  const chainInfo = useChainInfo();
  // const { setIsLoggingIn } = useContext(UserContext);
  const setWalletState = useSetRecoilState(walletState);
  // const somethingsomething = useRecoilValue(walletState);

  // const { network } = useRecoilValue(networkState);
  // console.log("i am in txnclient", network);
  // const [baseDenom, setBaseDenom] = useState(
  //   networkConstants[network.replace(/-/g, "")]?.baseDenom
  // );

  // useEffect(()=>{
  //   const newNet = networkConstants[network.replace(/-/g,'')].baseDenom;
  //   setBaseDenom(newNet)
  // }, [network])

  // const toaster = useMessageToaster();
  //  console.log(network,"netcons");
  return async (chainId = activeNetworkId) => {
    const tid = toast.loading("Connecting to wallet");
    try {
      // setIsLoggingIn(true);
      console.log("here i am");
      while (
        !(window as any).keplr ||
        !(window as any).getEnigmaUtils ||
        !(window as any).getOfflineSignerOnlyAmino
      ) {
        await sleep(0.5);
      }

      await (window as any).keplr.experimentalSuggestChain(
        await chainInfo.getChainInfoData(chainId)
      );
      await (window as any).keplr.enable(await chainInfo.getChainId(chainId));

      const offlineSigner = (window as any).keplr.getOfflineSignerOnlyAmino(
        await chainInfo.getChainId(chainId)
      );

      const [{ address }] = await offlineSigner.getAccounts();

      // console.log("reached here")
      const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
        await chainInfo.getRpcUrl(chainId),
        offlineSigner
      );

      const balance = await wasmChainClient.getBalance(
        address,
        await chainInfo.getDenomName(chainId)
      );

      const walletName = await (window as any).keplr.getKey(
        await chainInfo.getChainId(chainId)
      );

      toast.update(tid, {
        type: "success",
        render: `Keplr is connected!`,
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });

      /* successfully update the wallet state */
      setWalletState({
        address: address,
        shortAddress:
          address?.substr(0, 8) +
          "..." +
          address?.substr(address.length - 3, 3),
        balance: {
          amount: coinConvert(balance.amount, 6, "human"),
          denom: balance.denom,
        },
        client: wasmChainClient,
        nickName: walletName.name,
      });
      sessionStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoggingIn(false);
    }
  };
};
