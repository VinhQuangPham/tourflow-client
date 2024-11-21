import NavigationBar from "./NavigationBar";
import "../styles/CustomerProfile.css";
import { Link } from "react-router-dom";
import { useStringContext } from "../ContextAPI/TourFlowProvider";

const CustomerProfile = () => {
  const { setLogin } = useStringContext();
  const handleLogout = () => {
    setLogin(false);
    sessionStorage.clear();
  };
  return (
    <div>
      <NavigationBar />
      <Link to="/" id="redirect_logout">
        <div
          id="log_out"
          onClick={() => {
            handleLogout();
          }}
        >
          Log out
        </div>
      </Link>
    </div>
  );
};

export default CustomerProfile;
