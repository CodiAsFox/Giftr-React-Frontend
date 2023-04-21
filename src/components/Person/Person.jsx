
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePersonAPI from "../../api/usePersonAPI";
import CheckToken from "../../auth/CheckToken";
import { usePage } from "../../context/PageContext";
import { useToken } from "../../context/TokenContext";
import DeleteConfirm from "./Form/DeleteConfirm";
import PersonActions from "./Form/Actions";
import DateField from "./Form/DateField";
import NameField from "./Form/NameField";


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
  const [loading, setLoading] = useState(true);

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getPerson, postPerson, updatePerson, deletePerson } = usePersonAPI(
    token,
    setToken,
    id,
    url,
    navigate,
    setPerson
  );

  const personName = person.name;

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
    setLoading(false);
  }, []);

  return (
    <Box className="Person">

      <CheckToken />

      <Card borderRadius={10}>
        <CardHeader bg="pink.900" borderTopRadius={10}>
          <Skeleton isLoaded={!loading}>
            <Text
              size="lg"
              bgGradient="linear(to-r, green.200, pink.500)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
              display="inline-block"
            >
              <FontAwesomeIcon
                icon={faPersonCirclePlus}
                color="#25DAD6"
                width="3rem"
              />
            </Text>

            <Heading

              size="lg"
              bgGradient="linear(to-r, teal.500, pink.300, pink.500)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
              display="inline-block"
              pl="3"
            >

              {id ? `Edit ${personName}` : "Add person"}
            </Heading>

          </Skeleton>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl isRequired>

              <NameField
                person={person}
                setPerson={setPerson}
                loading={loading}
                errors={errors}
              />
              <DateField
                person={person}
                setPerson={setPerson}
                loading={loading}
                errors={errors}
              />
              <PersonActions id={id} savePerson={savePerson} onOpen={onOpen} />
              <Box className="formBox" pt={4}></Box>

            </FormControl>
          </Stack>
        </CardBody>
      </Card>

      <DeleteConfirm
        isOpen={isOpen}
        onClose={onClose}
        doDelete={doDelete}
        person={person}
      />
    </Box>
  );
  
};

export default Person;
