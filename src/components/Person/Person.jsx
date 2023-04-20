import { useState, useEffect } from "react";
import { useToken } from "../../context/TokenContext";
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { usePage } from "../../context/PageContext";
import { useParams, useNavigate } from "react-router-dom";

const Person = () => {
  const [token, setToken] = useToken();

  const params = useParams();
  const navigate = useNavigate();
  const [page, updatePage] = usePage();
  const [errors, setErrors] = useState({
    name: "",
    dob: "",
  });

  const id = params.id;

  const shape = {
    name: "",
    dob: "",
  };

  const [person, setPerson] = useState({ ...shape });

  useEffect(() => {
    updatePage({
      ...page,
      page: "people",
      id: id,
    });
  }, []);

  useEffect(() => {
    updatePage({ ...page, page: "people/add" });
  }, []);

  function validateForm() {
    const newErrors = {
      name: "",
      dob: "",
    };

    if (!person.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!person.dob.trim()) {
      newErrors.dob = "Birthday is required.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  }

  function savePerson() {
    if (validateForm()) {
      if (id) updatePerson(person);

      if (!id) postPerson(person);
    }
  }

  function doDelete() {
    deletePerson(id);
  }

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
        return data;
      })
      .then(({ name, dob }) => {
        dob = dob.split("T")[0];
        setPerson({ name, dob });
      })
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
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
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => navigate("/people"))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
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
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => navigate("/people"))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
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
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");
        return res.json();
      })
      .then(() => navigate("/people"))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  function DeleteConfirm() {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Do you want to delete {person.name}?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              This action will permanently delete the person and all associated
              saved gifts from your list. This action is irreversible.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={doDelete}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  useEffect(() => {
    if (id) {
      getPerson(); // fill the inputs with data from GET fetch
    }
  }, []);

  return (
    <Box className="Person">
      <Heading>{id ? `Edit ${person.name}` : "Add person"}</Heading>
      <FormControl isRequired>
        <FormLabel>Person's name</FormLabel>
        <Input
          type="text"
          name="name"
          maxLength="80"
          placeholder="Person's name"
          value={`${person.name}`}
          onChange={(ev) => {
            setPerson({ ...person, name: ev.target.value });
            handleInputChange(ev);
          }}
          required
        />
        {errors.name && <Text color="red.300">{errors.name}</Text>}

        <FormHelperText>E.g. Bob Robertson</FormHelperText>
        <FormLabel>Birthdate</FormLabel>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          id="dob"
          name="dob"
          pattern="\d{4}-\d{2}-\d{2}"
          value={`${person.dob}`}
          onChange={(ev) => setPerson({ ...person, dob: ev.target.value })}
          required
        />
        {errors.dob && <Text color="red.300">{errors.dob}</Text>}

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
          {id ? (
            <Button
              colorScheme="teal"
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              mr={3}
              onClick={onOpen}
            >
              <DeleteConfirm />
              Delete
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              mr={3}
              href="/people"
            >
              Cancel
            </Button>
          )}
        </div>
      </FormControl>
    </Box>
  );
  // else edit person
};

export default Person;
