export const networkConstants: Record<string, any> = {
  JunoMainnet: {
    baseDenom: "ujuno",
    baseSymbol: "JUNO",
    networkType: "Mainnet",
    mintscanPrefix: "https://mintscan.io/juno/txs/",
  },
  uni6: {
    baseDenom: "ujunox",
    baseSymbol: "JUNOX",
    networkType: "Testnet",
    mintscanPrefix: "https://testnet.mintscan.io/juno-testnet/txs/",
  },
  injective888: {
    baseDenom: "uinj",
    baseSymbol: "INJ",
    networkType: "Testnet",
    mintscanPrefix: "https://mintscan.io/injective/txs/",
  },
  pion1: {
    baseDenom: "untrn",
    baseSymbol: "NTRN",
    networkType: "Testnet",
    mintscanPrefix: "https://mintscan.io/neutron/txs/",
  },
};

export const typeDefaultValueMap = {
  string: "",
  number: 0,
  "readonly Coin[]": [],
  Coin: { amount: 0, denom: "" },
  "wasmKitTypes.TxnStdFee": { amount: [], gas: "" },
};

export const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "gray",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "gray.400",
  },
};
export const thinScrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "1px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "1px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "gray.100",
  },
};
