import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Skeleton,
  Stack,
  StackDivider,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import BoxListItem from "../BoxListItem/BoxListItem";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { usePage } from "../../context/PageContext";
import CheckToken from "../../auth/CheckToken";

const People = () => {
  const [people, setPeople] = useState([]);

  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [page, updatePage] = usePage();

  useEffect(() => {
    updatePage({ ...page, page: "people" });
  }, []);

  // API Call Functions (GET, DELETE)
  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people`;

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

  function getPeople() {
    let request = new Request(url, {
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
        return data.map((ppl) => {
          const person = {
            id: ppl._id,
            name: ppl.name,
            dob: ppl.dob,
            giftCount: ppl.giftCount,
          };
          return person;
        });
      })
      .then((ppl) => {
        ppl.sort((a, b) => {
          let dateA = new Date(a.dob);
          let dateB = new Date(b.dob);
          if (dateA.getMonth() > dateB.getMonth()) {
            return 1;
          } else if (dateB.getMonth() > dateA.getMonth()) {
            return -1;
          } else {
            return dateA.getDate() - dateB.getDate();
          }
        });
        console.log("ppl", ppl);
        setPeople(ppl);
      })
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
      });
  }

  useEffect(() => {
    getPeople();
    setLoading(false);
  }, []);
  return (
    <Box className="people" w="100%">
      <CheckToken />
      <Card borderRadius={10}>
        <CardHeader bg="pink.900" borderTopRadius={10}>
          <Text
            size="lg"
            bgGradient="linear(to-r, green.200, pink.500)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
            display="inline-block"
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
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
            People List
          </Heading>
        </CardHeader>
        <CardBody>
          <Skeleton isLoaded={!loading}>
            <Box minHeight="5rem">
              <Stack divider={<StackDivider />} spacing="4">
                {people.map((person) => (
                  <BoxListItem key={person.id} person={person} />
                ))}
              </Stack>
            </Box>
          </Skeleton>
        </CardBody>
      </Card>
    </Box>
  );
};

export default People;
