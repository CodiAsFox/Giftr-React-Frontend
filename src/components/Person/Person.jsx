import { useState, useEffect } from "react";
import { useToken } from "../../context/TokenContext";
import { Button } from "@chakra-ui/react";
import { usePage } from "../../context/PageContext";
import { useParams } from "react-router-dom";

const Person = () => {
  const [token, setToken] = useToken();

  const [page, updatePage] = usePage(null);
  const params = useParams();
  const id = params.id;

  const shape = {
    name: "",
    dob: "",
  };

  const [person, setPerson] = useState({ ...shape }); // a copy of shape is sent to STATE

  useEffect(() => {
    updatePage({
      ...page,
      page: "people",
      id: id,
    });
  }, []);

  // TODO: remove this useEffect after testing
  useEffect(() => {
    console.log(page);
  }, [page]);

  // clicking on SAVE button
  function savePerson() {
    if (id) {
      console.log('gonna PATCH')
      updatePerson(person);
    }

    if (!id) {
      postPerson(person);
    }
  }

  // fill the inputs with data from getPerson fetch

  // API GET, POST, PATCH, DELETE
  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people`;

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
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");
        return res.json();
      })
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .then(({name, dob}) => {
        dob = dob.split('T')[0];        
        setPerson({name, dob});
      })
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  } // end of getPerson

  function postPerson(data) {
    let request = new Request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetch(request).then((res) => {
      if (res.status === 401) throw new Error("Unauthorized access to API.");
      if (!res.ok) throw new Error("Invalid response");
      console.log("response: ", res);
      return res.json();
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

    fetch(request).then((res) => {
      if (res.status === 401) throw new Error("Unauthorized access to API.");
      if (!res.ok) throw new Error("Invalid response");
      console.log("response: ", res);
      return res.json();
    });
  }

  useEffect(()=>{
    if (id) {
      getPerson();
    }
  },[]);

  // if useParams id OR person not null, then edit person
  return (
    // ADD PERSON
    <section className="Person">
      <h2>{id ? "You are in edit [Bob]" : "Adding a person"}</h2>
      <form>
        <div className="formBox">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            maxLength="80"
            placeholder="Person's name"
            value={`${person.name}`}
            onChange={(ev) => setPerson({ ...person, name: ev.target.value })}
            required
          />
        </div>
        <div className="formBox">
          <label htmlFor="dob">Date of Birth </label>
          <input
            type="date"
            id="dob"
            name="dob"
            pattern="\d{4}-\d{2}-\d{2}"
            value={`${person.dob}`}
            onChange={(ev) => setPerson({ ...person, dob: ev.target.value })}
            required
          />
        </div>
        <div className="formBox">
          <Button
            colorScheme="teal"
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            mr={3}
            onClick={savePerson}
          >
            Save
          </Button>
          <Button
            colorScheme="teal"
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            mr={3}
          >
            Delete
          </Button>
        </div>
      </form>
    </section>
  );
  // else edit person
};

export default Person;
