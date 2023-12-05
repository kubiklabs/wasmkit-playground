import { atom } from "recoil";

export const activeNetworkState = atom<{
  activeNetworkId: string;
}>({
  key: "activeNetworkState",
  default: {
    // network: (localStorage.getItem("networkState") !== null)? localStorage.getItem("networkState") as string: "JunoTestnet",
    activeNetworkId: "",
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
