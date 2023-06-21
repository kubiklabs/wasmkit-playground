import { accessSync } from "fs";
import { toast } from "react-toastify";
import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { activeSection } from "../context/sectionState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faWallet } from "@fortawesome/free-solid-svg-icons";
import './navbar.css'
import HeaderSocials from "./socials/socials";
import { useDisconnetWallet } from "../hooks/useTxnClient";
const Navbar = () => {
  const resetUserData = useDisconnetWallet();
  const [activeSec, setActiveSec] = useRecoilState(activeSection)
  const handleNavClick = (sectionName: string) => {
    setActiveSec(sectionName);
  };

  return (
    <>
    <div className="navbar">
            <button
              onClick={() => handleNavClick("instantiate")}
              className={`${
                activeSec !== "query" && activeSec !== "execute"
                  ? "nav-item active"
                  : "nav-item"
              }`}
            >
             
              <div className="nav-heading">Contract Details</div>
            </button>
            <button
              onClick={() => handleNavClick("query")}
              className={`${
                activeSec === "query" ? "nav-item active" : "nav-item"
              }`}
            >
              <div className="nav-heading">Query</div>
            </button>
            <button
              onClick={() => handleNavClick("execute")}
              className={` ${
                activeSec === "execute" ? "nav-item active" : "nav-item"
              }`}
            >
              
              <div className="nav-heading">Execute</div>
              
            </button>
          </div>
          <div>
          <HeaderSocials></HeaderSocials>
          <div className="log-out">
            <div className="log-out-text">
            Log out 
            </div>
            
            <div className="log-out-button">
            <span
                  onClick={resetUserData}
                  className="material-symbols-outlined logout-logo"
                >
                  logout
                </span>
                <div className="floating-bubble-info logout-bubble-info">
                  Logout!
                </div>
            </div>
          </div>
          </div>
    </>
  )
};

export default Navbar;
