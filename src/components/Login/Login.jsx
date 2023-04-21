import { Button, Text, useToast } from "@chakra-ui/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToken } from "../../context/TokenContext";

const Login = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, updateToken] = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const label = props.label;
  const colour = props.colour;
  const icon = props.icon;
  const toast = useToast();

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

  function checkServerStatus(url) {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  }

  async function doLogin() {
    const redirect = import.meta.env.VITE_APP_URL;
    const authURL = import.meta.env.VITE_AUTH_URL;
    const baseURL = `${authURL}?redirect_url=${redirect}`;
    setIsLoading(true);
    const isAPIUp = await checkServerStatus(import.meta.env.VITE_API);

    if (isAPIUp) {
      location.href = baseURL;
    } else {
      toast({
        title: "Giftr is Temporarily Offline",
        description:
          "Our servers are currently unavailable. We apologize for any inconvenience this may cause. Please try again later.",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
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
