import { useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { Button, Tooltip } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const navigate = useNavigate();
  const [token, updateToken] = useToken();

  function doLogout() {
    updateToken(null);
    navigate("/");
  }

  return token ? (
    <Button
      onClick={doLogout}
      as={"a"}
      fontSize={"sm"}
      fontWeight={600}
      colorScheme="gray"
      pr={2}
    >
      <Tooltip label="Logout" hasArrow bg="red.600" color="white">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </Tooltip>
    </Button>
  ) : (
    <></>
  );
};

export default Logout;
