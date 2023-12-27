import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

import { walletState } from "../context/walletState";
import { coinConvert, sleep } from "../utils/helpers";
import { useMessageToaster } from "./useMessageToaster";
import { toast } from "react-toastify";
import { useChainInfo } from "./useChainInfo";
import { activeNetworkState } from "../context/networkContractState";
import testnetList from "../config/testnetList.json";

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
      addrPrefix: undefined,
      queryClient: undefined,
      address: undefined,
      shortAddress: undefined,
      balance: undefined,
      nickName: undefined,
      isTestnet: undefined,
    });
    toast.warn("Wallet Disconnected!");
  };
};

export const useConnectWallet = () => {
  const { activeNetworkId } = useRecoilValue(activeNetworkState);
  const chainInfo = useChainInfo();
  const disconnect = useDisconnetWallet();
  const setWalletState = useSetRecoilState(walletState);
  const setActiveNetwork = useSetRecoilState(activeNetworkState);

  return async (chainId = activeNetworkId) => {
    setActiveNetwork({
      activeNetworkId: chainId,
      isLoggingIn: true,
    });
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
      const queryClient = await CosmWasmClient.connect(
        await chainInfo.getRpcUrl(chainId)
      );

      const balance = await wasmChainClient.getBalance(
        address,
        await chainInfo.getMinimalDenomName(chainId)
      );

      const walletName = await (window as any).keplr.getKey(
        await chainInfo.getChainId(chainId)
      );

      toast.update(tid, {
        type: "success",
        render: `Keplr is connected to ${chainId}!`,
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });

      const isTestnet = Object.keys(testnetList).find((id) => id === chainId);
      /* successfully update the wallet state */
      setWalletState({
        address: address,
        addrPrefix: await chainInfo.getAccAddrPrefix(chainId),
        shortAddress:
          address?.substr(0, 8) +
          "..." +
          address?.substr(address.length - 3, 3),
        balance: {
          amount: coinConvert(balance.amount, 6, "human"),
          denom: await chainInfo.getDenomName(chainId),
        },
        client: wasmChainClient,
        queryClient,
        nickName: walletName.name,
        isTestnet: isTestnet ? true : false,
      });
    } catch (error) {
      console.log(error);
      disconnect();
      toast.update(tid, {
        type: "error",
        render: `Cannot connect to ${chainId} due to the following error: \n${
          (error as Error).message
        }`,
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
    } finally {
      setActiveNetwork({
        activeNetworkId: chainId,
        isLoggingIn: false,
      });
    }
  };
};
