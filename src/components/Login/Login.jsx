import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { Button, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, updateToken] = useToken();
  const [isLoading, setIsLoading] = useState(false); // added state variable
  const label = props.label;
  const colour = props.colour;
  const icon = props.icon;

  const navigate = useNavigate();

  useEffect(() => {
    //check for token in querystring
    const urlToken = searchParams.get("token");

    if (urlToken) {
      updateToken(urlToken);
      navigate("/people");
    }
    //check if token already exists in context
    if (token) {
      navigate("/people");
    }
  }, []);

  function doLogin() {
    const redirect = import.meta.env.VITE_APP_URL;
    const authURL = import.meta.env.VITE_AUTH_URL;
    const baseURL = `${authURL}?redirect_url=${redirect}`;
    setIsLoading(true);
    location.href = baseURL;
  }

  return (
    <Button
      onClick={doLogin}
      isLoading={isLoading}
      as={"a"}
      fontSize={"sm"}
      fontWeight={600}
      colorScheme={colour ?? "pink"}
    >
      {icon ? (
        <Text pr={2}>
          <FontAwesomeIcon icon={faGoogle} />
        </Text>
      ) : (
        <></>
      )}
      {label ?? "Login"}
    </Button>
  );
};

export default Login;
