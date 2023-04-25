import { useRecoilValue } from 'recoil';
import { isPropertyAccessChain } from 'typescript';
// import ClassInfo from "../../src/counterInf.json";
import { Contract } from "../hooks/clients/contract"
import contractInfo from "../../src/counter.json";
import { walletState } from "../context/walletState";
import Headlines from './headlines';
function Preview(msg :any){

    const t = JSON.stringify(msg,null,2);
    console.log(t)
    return(
        <div className='preview-box'>
         <Headlines heading='preview' subheading=''></Headlines>
             <p>{t}</p>
             {/* <p>{msg}</p> */}
        </div>
    )
}

export default Preview;