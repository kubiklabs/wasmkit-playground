import { useParams } from "react-router-dom";
import Sheet from "../components/layout/Sheet";

const ContractDetails = () => {
  const { contractid } = useParams();
  console.log(contractid);

  return <Sheet>Contract Details</Sheet>;
};

export default ContractDetails;
