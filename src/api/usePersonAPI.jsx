import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

function usePersonAPI(token, setToken, id, url, navigate, setPerson) {
  function getPerson() {
    // api/people/${id}
    let endpoint = `${url}/${id}`;
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
      .then(({ name, dob }) => {
        dob = dob.split("T")[0];
        setPerson({ name, dob });
      })
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  function postPerson(data) {
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
      .then(() => navigate("/people"))
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  function updatePerson(data) {
    let endpoint = `${url}/${id}`;
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
      .then(() => navigate("/people"))
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  function deletePerson(persId) {
    let endpoint = `${url}/${persId}`;
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
      .then(() => navigate("/people"))
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
        navigate("/404");
      });
  }

  const getPersonCallback = useCallback(
    () => getPerson(),
    [token, setToken, id, url, navigate]
  );
  const postPersonCallback = useCallback(
    (data) => postPerson(data),
    [token, setToken, url, navigate]
  );
  const updatePersonCallback = useCallback(
    (data) => updatePerson(data),
    [token, setToken, id, url, navigate]
  );
  const deletePersonCallback = useCallback(
    () => deletePerson(id),
    [token, setToken, id, url, navigate]
  );

  return {
    getPerson: getPersonCallback,
    postPerson: postPersonCallback,
    updatePerson: updatePersonCallback,
    deletePerson: deletePersonCallback,
  };
}

export default usePersonAPI;
