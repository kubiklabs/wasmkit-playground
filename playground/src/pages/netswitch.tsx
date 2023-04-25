import React, { useState, useEffect } from "react";
import { networkState } from "../context/networkState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./netswitch.css";
// import { useNavigate } from "react-router-dom";
import { configState } from "../context/configState";

import { faCaretDown, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDetectClickOutside } from "react-detect-click-outside";

// import mainnetPoolsList from "../config/mainnet/pools_info.json";
import mainnetChainInfo from "../config/juno_mainnet/chain_info.json";
// import mainnetAssetsList from "../../../config/mainnet/assets_info.json";
// import mainnetIbcChainList from "../../../config/mainnet/ibc_chain_info.json";
import mainnetOtherContracts from "../config/juno_mainnet/other_contracts.json";

// import testnetPoolsList from "../../../config/testnet/pools_info.json";
import testnetChainInfo from "../config/juno_testnet/chain_info.json";
// import testnetAssetsList from "../../../config/juno_testnet/assets_info.json";
// import testnetIbcChainList from "../../../config/juno_testnet/ibc_chain_info.json";
import testnetOtherContracts from "../config/juno_testnet/other_contracts.json";
import {
  ChainInfo,
  contractInfo,
  PoolInfo,
  TokenInfo,
} from "../types/configTypes";

import ThemeToggle from "./themeToggle";
import { sleep } from "../utils/common";
// import RewardClaim from "./RewardClaim";
// import { useLiquidity } from "../../../hooks/useLiquidity";
import { showUsershowState } from "../context/showUserState";
// import { queryClientState } from "../../../context/queryClientState";
// import { userLiqState } from "../../../context/userLiqState";
import { walletState } from "../context/walletState";
import ConnectWalletButton from "../components/common/buttons/connectWallet";
// import { sleepTime } from "../utils/constants";


const NetSwitch = () => {
//   const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });
  const setNetState = useSetRecoilState(networkState);
//   const navigate = useNavigate();
  const [config, setConfigState] = useRecoilState(configState);
  let { network } = useRecoilValue(networkState);
  const [open, setOpen] = useState(false);
  // console.log("am i being called again and again(netswitch)");

  // use this when mainnet is ready too
  // const [value, setValue] = useState<any>(localStorage.getItem("networkState"));

  const [value, setValue] = useState<any>("testnet");
//   const { getPoolUserAmount } = useLiquidity();
  const [nowCheck, setNowcheck] = useState(false);
//   const { queryClient } = useRecoilValue(queryClientState);


  const setUserShow = useSetRecoilState(showUsershowState);
  const usershowData = useRecoilValue(showUsershowState);
//   const setuserLiqShow = useSetRecoilState(userLiqState);
//   const userLiqShow = useRecoilValue(userLiqState);

  const readConfig = () => {
    // const poolsList =
    //   network === "mainnet" ? mainnetPoolsList : testnetPoolsList;
    const chainInfo =
      network === "mainnet" ? mainnetChainInfo : testnetChainInfo;
    // const assetsList =
    //   network === "mainnet" ? mainnetAssetsList : testnetAssetsList;
    // const ibcChainList =
    //   network === "mainnet" ? mainnetIbcChainList : testnetIbcChainList;
    const otherContracts =
      network === "mainnet" ? mainnetOtherContracts : testnetOtherContracts;

    // let poolsMap: Record<string, PoolInfo> = {};
    // poolsList.pairs.forEach((pair) => {
    //   poolsMap[pair.pair_name] = pair;
    // });

    // let assetsMap: Record<string, TokenInfo> = {};
    // assetsList.assets.forEach((asset: any) => {
    //   assetsMap[asset.display_denom] = asset;
    // });

    // let ibcChainInfoMap: Record<string, ChainInfo> = {};
    // ibcChainList.chains.forEach((chain) => {
    //   ibcChainInfoMap[chain.stakeCurrency.coinDenom] = chain;
    // });

    let otherContractsMap: Record<string, contractInfo> = {};
    Object.entries(otherContracts).forEach(([contractName, value]) => {
      otherContractsMap[contractName] = value;
    });

    let userMap: Record<string, boolean> = {};

    return {
      disclaimerSeen: false,
      tourSeen: false,
    //   poolsMap: poolsMap,
    //   ibcChainInfo: ibcChainInfoMap,
    //   assetsMap: assetsMap,
      chainInfo: chainInfo,
      otherContractsMap: otherContractsMap,
      userMap: userMap,
    };
  };

  const handleChange = async (event: string) => {
    setValue(event);
    localStorage.setItem("networkState", event);
    setNetState({
      network: event,
    });

    // navigate("/");
    window.location.reload();
  };
  const handleopen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    // todo later: remove interval, find effiecient method for userMap
    const intervalid = setInterval(() => {
      setConfigState(readConfig());
    }, 3000);
    setTimeout(() => {
      clearInterval(intervalid);
    }, 10000);
  // }, [network, queryClient, nowCheck, walletState]);
  }, [network, nowCheck, walletState]);

  return (
    // <div className="dropdown-div">
    //   <ThemeToggle />

    //   <label>
    //     <select className="dropdown" value={value} onChange={handleChange}>
    //       <option className="dd-option" value="mainnet">
    //         Mainnet
    //       </option>
    //       <option className="dd-option" value="testnet">
    //         Testnet
    //       </option>
    //     </select>
    //   </label>
    // </div>
    <div className="dropdown-div">
      <div className="">
        <ConnectWalletButton />
      </div>
      <ThemeToggle />
      <div className="poolSort network-button disabled-btn" onClick={()=>{}} >

        <div>{value === "mainnet" ? "Mainnet" : "Testnet"}</div>
        <div>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {open ? (
          <div className="sortby-menu">
            <div
              onClick={() => handleChange("mainnet")}
              className={`sortby-input${
                value === "mainnet" ? "sortby-input__active" : ""
              }`}
            >
              Mainnet
            </div>
            {/* <div
              onClick={() => handleChange("testnet")}
              className={`sortby-input${
                value === "testnet" ? "sortby-input__active" : ""
              }`}
            >
              Testnet
           </div> */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NetSwitch;
