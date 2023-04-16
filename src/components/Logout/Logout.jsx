import { useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";

const Logout = () => {
  const navigate = useNavigate();
  const [token, updateToken] = useToken();

  function doLogout() {
    updateToken(null);
    navigate("/");
  }

  return token ? (
    <p>
      <button onClick={doLogout}>Logout</button>
    </p>
  ) : (
    <></>
  );
};

export default Logout;
