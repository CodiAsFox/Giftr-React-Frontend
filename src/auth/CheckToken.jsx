import { useNavigate, useLocation } from "react-router-dom";
import { useToken } from "../context/TokenContext";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export default function CheckToken() {
  const location = useLocation();
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!token && location.pathname != "/") {
      navigate("/");
      toast({
        title: "Session Expired",
        description: "You need to login to view that page.",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
  }, []);

  return null;
}
