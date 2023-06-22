import React, { useEffect, useState } from "react";
// import contractName from "../../src/contracts.json";
import Instantiate from "../components/instantiate";
import Execute from "../components/execute";
import Query from "../components/query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderSocials from "../components/socials/socials";
import "./home.css";
import "../components/common/buttons/buttons.css";
import NetSwitch from "../components/netswitch";
import logolight from "../assets/img/logoLight.png";
import logodark from "../assets/img/logoDark.png";
import { themeState } from "../context/themeState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useConnectWallet } from "../hooks/useTxnClient";
import { walletState } from "../context/walletState";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContrctNameJson from "../contracts/instantiateInfo/contractList.json"
import { networkArrayState, networkState } from "../context/networkState";
import ProjectMenu from "../components/projectMenu";
import Navbar from "../components/navbar";
import { activeSection } from "../context/sectionState";
function Home() {
  // const [activeSection, setActiveSection] = useState<string>("instantiate");
  // const [activeSec, setActiveSec] = useSetRecoilState(activeSection)
  const activeSec = useRecoilValue(activeSection);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [active, setActive] = useState(false);
  const contractName = Object.keys(ContrctNameJson);
  const [activeContract, setActiveContract] = useState<string>(
    contractName[activeIndex]
    );
    const network = useRecoilValue(networkState);
    const setnetworkArr = useSetRecoilState(networkArrayState);

  // const handleNavClick = (sectionName: string) => {
  //   setActiveSec(sectionName);
  // };

  const handleSidebarClick = (index: number) => {
    setActiveIndex(index);
    setActiveContract(contractName[index]);
  };
  const { address } = useRecoilValue(walletState);
  // const { activeSection } = useRecoilValue()
  const root = document.querySelector(":root");
  const theme = useRecoilValue(themeState);
  const connectWallet = useConnectWallet();

  useEffect(() => {
    if (theme === "Light") {
      root?.classList.add("lighttheme");
    }
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn === "true") {
      if (address === undefined) {
        connectWallet();
      }
    }


  }, []);

  
  // const outputMap = new Map<string, [string, string[]]>();

  // Object.entries(ContrctNameJson).forEach(([outerKey, projectData]) => {
  //   Object.entries(projectData).forEach(([innerKey, value]) => {
  //     const { chainId } = value;
  //     if (outputMap.has(chainId)) {
  //       outputMap.get(chainId)![1].push(outerKey);
  //     } else {
  //       outputMap.set(chainId.replace(/-/g,''), [innerKey, [outerKey]]);
  //     }
  //   });
  // });
  
  // outputMap.forEach(([innerKey, outerKeys], chainId) => {
  //   console.log(`${chainId}: [${innerKey}, [${outerKeys.join(', ')}]]`);
  // });

  if(!activeContract){
    return(
      <h1 className="blank-home-page">
        No contract Compiled
      </h1>
    )
  }


  const outputMap = new Map<string, [string, string[]]>();

Object.entries(ContrctNameJson).forEach(([outerKey, projectData]:any) => {
  if(projectData === undefined || projectData === null){
    projectData = {

    }
  }
  Object.entries(projectData).forEach(([innerKey, value]) => {
    const chainId:any  = value;
    if (outputMap.has(chainId["chainId"].replace(/-/g,''))) {
      outputMap.get(chainId["chainId"].replace(/-/g,''))![1].push(outerKey);
    } else {
      outputMap.set(chainId["chainId"].replace(/-/g,''), [innerKey, [outerKey]]);
    }
  });
});

const outerKeysArray = outputMap.get(network.network)?.[1] || [];

console.log("final array", outerKeysArray);

  // console.log("outputMap", outputMap.get(network.network)![1]);


  const tempinfo: any = ContrctNameJson;
  const tempSubArray = Object.keys(tempinfo[activeContract]);

  let netwwwarr:any = [];
  const myMap: Map<string, string> = new Map();

  tempSubArray.forEach((item)=>{
    netwwwarr.push((tempinfo[activeContract][item]?.chainId).replace(/-/g,''));
    myMap.set((tempinfo[activeContract][item]?.chainId).replace(/-/g,''),item)
  })
  console.log("something need to check here", netwwwarr);

  setnetworkArr({
    networkArray: (Array.from(outputMap.keys()))});
  
  // if(!activeContract){
  //   return(
  //     <h1 className="blank-home-page">
  //       No contract Compiled
  //     </h1>
  //   )
  // }
  return (
    <>
      <div className="home-page">
        {/* <div className='container'> */}
        
        <div className="container">
          <NetSwitch></NetSwitch>
          <ProjectMenu />
        
        </div>
        <div className="handle-side">
          <div
            className="menuIcon" >
            {/* <div className="menuIcon-icon">
              <FontAwesomeIcon icon={active ? faXmark : faBars} />
            </div> */}
          </div>
          <div className={active ? "sidebar active" : "sidebar"}>
            <Navbar></Navbar>
          {/* <div className="navbar">
            <button
              onClick={() => handleNavClick("instantiate")}
              className={`${
                activeSection !== "query" && activeSection !== "execute"
                  ? "nav-active"
                  : "navbar-item"
              }`}
            >
              <div className="nav-heading">Contract Details</div>
            </button>
            <button
              onClick={() => handleNavClick("query")}
              className={`${
                activeSection === "query" ? "nav-active" : "navbar-item"
              }`}
            >
              <div className="nav-heading">Query</div>
            </button>
            <button
              onClick={() => handleNavClick("execute")}
              className={` ${
                activeSection === "execute" ? "nav-active" : "navbar-item"
              }`}
            >
              
              <div className="nav-heading">Execute</div>
             
            </button>
          </div> */}

            {/* <div className="sidebar-menu">
              {outerKeysArray.map((name, index) => (
                <div
                  className={`${
                    activeContract === name
                      ? "sidebar-button__active"
                      : "sidebar-button"
                  }`}
                >
                  <button onClick={() => handleSidebarClick(index)}>
                    {" "}
                    {name}
                  </button>
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className="playground">
          {/* {activeSection !== "instantiate" &&
            activeSection !== "execute" &&
            activeSection !== "query" && (
              <Instantiate contractName={activeContract} triggerPage={handleNavClick}/>
            )} */}
          {activeSec === "instantiate" && (
            // <Instantiate contractName={activeContract} triggerPage={handleNavClick} tempSubArray={tempSubArray} myMap={myMap}></Instantiate>
            <Instantiate contractName={activeContract}  tempSubArray={tempSubArray} myMap={myMap}></Instantiate>
          )}
          {activeSec === "execute" && (
            <Execute contractName={activeContract} myMap={myMap}/>
          )}
          {activeSec === "query" && <Query contractName={activeContract} myMap={myMap}/>}
        </div>
      </div>
      <ToastContainer className="toastcustom_style"/>
    </>
  );
}

export default Home;
