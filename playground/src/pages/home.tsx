import React, { useState } from 'react';
import ConnectWalletButton from './../components/common/buttons/connectWallet';
// import { useEffect, useState } from 'react';
import Headlines from './headlines';
import contractName from "../../src/contracts.json";
import Instantiate from './instantiate';
import Execute from './execute';
import Query from './query';
import './home.css'

function Home() {
 
  
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeContract, setActiveContract] = useState<string>(contractName[activeIndex]);
  
    const handleNavClick = (sectionName: string) => {
      setActiveSection(sectionName);}
  
    const handleSidebarClick=(index: number)=>{
      setActiveIndex(index);
      setActiveContract(contractName[index]);
    }
  return ( 
    <>
    <div className='home-page'>
      {/* <div className='container'> */}
      <div className='sidebar'>
         
         <h2>Playground</h2>

           <ul>
          {contractName.map((name, index) => (
           <li key={index}>
            <button onClick={()=>handleSidebarClick(index)}> {name}</button>
            </li>
           ))}
             </ul>
      </div>
      {/* <div className='navbar-container'> */}
        <div className='navbar'>
          <div className='wallet-button'>
          <ConnectWalletButton></ConnectWalletButton>
          </div>
          <div className='description'>
             {activeContract}

             </div>
       <button onClick={() => handleNavClick('instantiate')} className={`navbar-item ${activeSection !== 'query' && activeSection !== 'execute'? 'active' : ''}`}>
      <div className='instantiate'>
        
        <Headlines heading='Instantiate' subheading=''></Headlines>
       
      </div>
      </button>
      <button onClick={() => handleNavClick('query')} className={`navbar-item ${activeSection === 'query' ? 'active' : ''}`}>
      <div className='query'>
    
      <Headlines heading='Query' subheading=''></Headlines>
 
      </div>
      </button>
      <button onClick={() => handleNavClick('execute')} className={`navbar-item ${ activeSection === 'execute'? 'active' : ''}`}>

      <div className='execute'>
     
      <Headlines heading='Execute' subheading=''></Headlines>
      
      </div>
      </button>
      </div>
      {/* </div> */}
      <div className='playground'>
        {(activeSection !== 'instantiate' && activeSection !== 'execute' && activeSection !== 'query' )&& <Instantiate contractName={activeContract}/>}
        {activeSection === 'instantiate' && <Instantiate contractName= {activeContract}></Instantiate>}
        {activeSection === 'execute' && <Execute contractName= {activeContract}/>}
        {activeSection === 'query' && <Query contractName= {activeContract}/>}
      </div>
    </div>
      {/* </div> */}
  
    </>
  )
}

export default Home;
