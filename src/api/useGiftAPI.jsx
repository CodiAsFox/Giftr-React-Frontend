import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

function useGiftAPI(token, setToken, personId, giftId, url, navigate, setGift) {
  const toast = useToast();
  function Unauthorized() {
    toast({
      title: "Session Invalid",
      description: "You need to login to view that page.",
      status: "error",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  }
  function Toast(title, desc) {
    toast({
      title: title,
      description: desc,
      status: "error",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  }
  function getGift() {
    // api/people/${id}/gifts/${giftId}
    let endpoint = `${url}/${giftId}`;
    let request = new Request(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) {
          Unauthorized();
          setToken(null);
          navigate("/");
          throw new Error("Unauthorized access to API.");
        }
        if (!res.ok) throw new Error("Invalid response");
        return res.json();
      })
      .then(({ data }) => {
        return data;
      })
      .then((data) => {
        setGift(data);
      })
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  function postGift(data) {
    let request = new Request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) {
          Unauthorized();
          setToken(null);
          navigate("/");
          throw new Error("Unauthorized access to API.");
        }
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  function updateGift(data) {
    let endpoint = `${url}/${giftId}`;
    let request = new Request(endpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) {
          Unauthorized();
          setToken(null);
          navigate("/");
          throw new Error("Unauthorized access to API.");
        }
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  function deleteGift(giftId) {
    // api/people/${id}
    let endpoint = `${url}/${giftId}`;
    let request = new Request(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) {
          Unauthorized();
          setToken(null);
          navigate("/");
          throw new Error("Unauthorized access to API.");
        }
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  const getGiftCallback = useCallback(
    () => getGift(),
    [token, setToken, personId, giftId, url, navigate]
  );
  const postGiftCallback = useCallback(
    (data) => postGift(data),
    [token, setToken, personId, url, navigate]
  );
  const updateGiftCallback = useCallback(
    (data) => updateGift(data),
    [token, setToken, personId, giftId, url, navigate]
  );
  const deleteGiftCallback = useCallback(
    () => deleteGift(giftId),
    [token, setToken, personId, giftId, url, navigate]
  );

  return {
    getGift: getGiftCallback,
    postGift: postGiftCallback,
    updateGift: updateGiftCallback,
    deleteGift: deleteGiftCallback,
  };
}

export default useGiftAPI;
