import { useState } from 'react';
import { useToken } from "../../context/TokenContext";
import { Button } from "@chakra-ui/react";

const AddPerson = () => {
  const [token, setToken] = useToken();
  
  const shape = {
    name: '',
    dob: '',
  };
  
  const [person, setPerson] = useState({...shape}); // a copy of shape is sent to STATE
  
  function savePerson() {
    postPerson(person);
  }

  function postPerson(data) {
    const api = import.meta.env.VITE_API_URL;
    const url = `${api}/people`;
    let request = new Request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify(data),
    });

    fetch(request)
      .then(res=>{
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");
        console.log('response: ', res);
        return res.json();
      })
  }

  // if useParams id OR person not null, then edit person
  return (
    // ADD PERSON
    <section className="addPerson">
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
              required />
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
            required />
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
  )
  // else edit person
}

export default AddPerson