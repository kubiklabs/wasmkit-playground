import React from "react";
// import contractName from "../../src/contracts.json";
import ConnectWalletButton from "./common/buttons/connectWallet";
import ContrctNameJson from "../contracts/instantiateInfo/contractList.json"
import "./sidebar.css";
function SideNavbar(): JSX.Element {
  const contractName = Object.keys(ContrctNameJson);
  return (
    <div className="sidebar">
      <ConnectWalletButton></ConnectWalletButton>

      <ul>
        {contractName.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavbar;
