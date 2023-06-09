import React, { useState, useEffect, useRef } from "react";
import { networkState } from "../context/networkState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./netswitch.css";
import { configState } from "../context/configState";

import {
  faBars,
  faCaretDown,
  faSort,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mainnetChainInfo from "../config/uni-6/chain_info.json";

import mainnetOtherContracts from "../config/uni-6/chain_info.json";

import testnetChainInfo from "../config/uni-6/chain_info.json";

import testnetOtherContracts from "../config/uni-6/chain_info.json";
import {
  ChainInfo,
  contractInfo,
  PoolInfo,
  TokenInfo,
} from "../types/configTypes";

import ThemeToggle from "./themeToggle";
import { sleep } from "../utils/common";

import { showUsershowState } from "../context/showUserState";

import { walletState } from "../context/walletState";
import ConnectWalletButton from "../components/common/buttons/connectWallet";

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

  const readConfig = () => {
    // const poolsList =
    //   network === "mainnet" ? mainnetPoolsList : testnetPoolsList;
    console.log("network state", network);
    const chainInfo =
      network === "mainnet" ? mainnetChainInfo : testnetChainInfo;

    const otherContracts =
      network === "mainnet" ? mainnetOtherContracts : testnetOtherContracts;

    let otherContractsMap: Record<string, contractInfo> = {};
    Object.entries(otherContracts).forEach(([contractName, value]) => {
      // otherContractsMap[contractName] = value;
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
    window.location.reload();
    // localStorage.setItem("networkState", event);
    // setNetState({
    //   network: event,
    // });

    // navigate("/");
  };
  const handleopen = () => {
    if(open === false){
      setOpen(true);
    }
    else setOpen(false);
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

  const refthree = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) =>{
    if (refthree.current && !refthree.current.contains(e.target as Node)) {
      // setOpen(false);
      setOpen(false);
    }
  }

  useEffect(()=>{
    document.addEventListener("click", handleClickOutside, true)
  }, [])

  return (
    <div className="dropdown-div">
      <div className="">
        <ConnectWalletButton />
      </div>
      <ThemeToggle />
      {/* use classname for disabling btn----> disabled-btn */}
      <div className="poolSort network-button" onClick={handleopen} ref = {refthree}>
        <div>{value === "mainnet" ? "Mainnet" : "Testnet"}</div>
        <div>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {open ? (
          <div className="net-toggle-dropdown">
            <div
              onClick={() => handleChange("mainnet")}
              className={`sortby-input${
                value === "mainnet" ? "sortby-input__active" : ""
              }`}
            >
              Mainnet
            </div>
            <div
              onClick={() => handleChange("Testnet")}
              className={`sortby-input ${
                value === "Testnet" ? "sortby-input__active" : ""
              }`}
            >
              Testnet
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NetSwitch;
