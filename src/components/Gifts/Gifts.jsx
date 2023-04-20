import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { faGifts } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import CheckToken from "../../auth/CheckToken";
import { usePage } from "../../context/PageContext";
import { useToken } from "../../context/TokenContext";
import BoxListItem from "../BoxListItem/BoxListItem";

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const [token, setToken] = useToken();

  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [page, updatePage] = usePage();
  const shape = {
    name: "",
    dob: "",
  };

  const [person, setPerson] = useState({ ...shape });

  useEffect(() => {
    updatePage({ ...page, page: "gifts", id: id });
  }, []);

  // API Call Functions (GET, DELETE)
  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people/${id}/gifts`;

  function getGifts() {
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
        return data.map((gft) => {
          const gf = {
            gift_id: gft._id,
            gift_name: gft.txt,
            url: gft.url,
            store: gft.store,
          };
          return gf;
        });
      })
      .then((giftArr) => {
        setGifts(giftArr);
      })
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
      });
  }

  const urlPerson = `${api}/people`;

  function getPerson() {
    let endpoint = `${urlPerson}/${id}`;
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
      });
  }

  function removeGiftFromList(giftId) {
    let updatedGifts = gifts.filter((gift) => gift.gift_id !== giftId);
    setGifts(updatedGifts);
  }

  function deleteGift(id) {
    let endpoint = `${url}/${id}`;
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
      .then(() => removeGiftFromList(id))
      .catch((err) => {
        console.warn(err.message);
        Toast("Something went wrong", err.message);
      });
  }

  useEffect(() => {
    getPerson();
  }, []);
  useEffect(() => {
    getGifts();
    setLoading(false);
  }, [person]);

  return (
    <Box className="gifts" w="100%">
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
              <FontAwesomeIcon icon={faGifts} color="#25DAD6" width="3rem" />
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
              {person.name} gift List
            </Heading>
          </Skeleton>
        </CardHeader>
        <CardBody>
          <Skeleton isLoaded={!loading}>
            <Stack divider={<StackDivider />} spacing="4">
              {!gifts[0] ? (
                <Box>
                  <Heading size="lg">
                    There's not Gifts for <strong>{person.name}</strong>!
                  </Heading>
                  <br />
                  Tap the button above to add one.
                </Box>
              ) : (
                gifts.map((gift) => (
                  <BoxListItem
                    key={gift.gift_id}
                    gift={gift}
                    deleteItem={deleteGift}
                  />
                ))
              )}
            </Stack>
          </Skeleton>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Gifts;
