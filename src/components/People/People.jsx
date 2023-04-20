import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import BoxListItem from "../BoxListItem/BoxListItem";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { usePage } from "../../context/PageContext";

const People = () => {
  const [people, setPeople] = useState([]);

  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const [page, updatePage] = usePage();

  useEffect(() => {
    updatePage({ ...page, page: "people" });
  }, []);

  // API Call Functions (GET, DELETE)
  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people`;

  function getPeople() {
    let request = new Request(url, {
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
        // console.log(data);
        return data.map((ppl) => {
          const person = {
            id: ppl._id,
            name: ppl.name,
            dob: ppl.dob,
            gifts: ppl.gifts,
          };
          return person;
        });
      })
      .then((ppl) => {
        ppl.sort((a,b)=> b.dob > a.dob ? 1 : -1);
        // console.log(`${sortedPpl}`)
        console.log("ppl", ppl);
        setPeople(ppl);
      })
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <Box className="people">
      <Card borderRadius={10}>
        <CardHeader bg="pink.900" borderTopRadius={10}>
          <Heading
            size="lg"
            bgGradient="linear(to-r, green.200, pink.500)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
              color="#9be59d"
              width="3rem"
            />
            <Text display="inline" pl={1}>
              People List
            </Text>
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {people.map((person) => (
              <BoxListItem key={person.id} person={person} />
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default People;
