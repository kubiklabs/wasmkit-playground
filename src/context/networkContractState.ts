import { atom } from "recoil";

export const activeNetworkState = atom<{
  activeNetworkId: string;
  isLoggingIn: boolean;
}>({
  key: "activeNetworkState",
  default: {
    // network: (localStorage.getItem("networkState") !== null)? localStorage.getItem("networkState") as string: "JunoTestnet",
    activeNetworkId: "",
    isLoggingIn: false,
  },
  dangerouslyAllowMutability: true,
});

export const networkContracts = atom<{
  networkContractsList: any;
}>({
  key: "networkListState",
  default: {
    // network: (localStorage.getItem("networkState") !== null)? localStorage.getItem("networkState") as string: "JunoTestnet",
    networkContractsList: undefined,
  },
  dangerouslyAllowMutability: true,
});
