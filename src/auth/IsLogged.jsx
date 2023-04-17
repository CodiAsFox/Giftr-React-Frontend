import { useToken } from "../context/TokenContext";

function IsLogged() {
  const [token, setToken] = useToken();

  if (!token) {
    return false;
  } else {
    return true;
  }
}

export default IsLogged;
