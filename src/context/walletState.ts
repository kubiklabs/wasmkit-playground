import { atom } from "recoil";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const walletState = atom<{
  client: SigningCosmWasmClient | undefined;
  addrPrefix: string | undefined;
  queryClient: CosmWasmClient | undefined;
  address: string | undefined;
  shortAddress: string | undefined;
  balance: Coin | undefined;
  nickName: string | undefined;
  isTestnet: boolean | undefined;
}>({
  key: "walletState",
  default: {
    addrPrefix: undefined,
    client: undefined,
    queryClient: undefined,
    address: undefined,
    shortAddress: undefined,
    balance: {
      amount: "",
      denom: "",
    },
    nickName: undefined,
    isTestnet: undefined,
  },
  dangerouslyAllowMutability: true,
});
