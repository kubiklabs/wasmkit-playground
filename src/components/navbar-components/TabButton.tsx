import GeneralButton from "../buttons/GeneralButton";
import { Link } from "react-router-dom";
const TabButton = ({
  name,
  path,
  id,
}: {
  name: string;
  path: string;
  id: string;
}) => {
  return (
    <Link style={{ flex: 1 }} to={path}>
      <GeneralButton fontSize={"1.2rem"} width={"100%"} id={id} name={name} />
    </Link>
  );
};

export default TabButton;
