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
    <button onClick={doLogout}>
      <span className="material-symbols-rounded">logout</span>
      <span className="menu-text">Logout</span>
    </button>
  ) : (
    <></>
  );
};

export default Logout;
