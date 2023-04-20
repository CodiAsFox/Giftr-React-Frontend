import { useEffect, useState } from "react";

import { useToken } from "../../context/TokenContext";
import { usePage } from "../../context/PageContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Box,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGifts } from "@fortawesome/free-solid-svg-icons";
import BoxListItem from "../BoxListItem/BoxListItem";

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const [token, setToken] = useToken();

  const { id } = useParams();

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
        if (res.status === 401) throw new Error("Unauthorized access to API.");
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
        setToken(null);
        navigate("/");
      });
  }

  const urlPerson = `${api}/people`;
  console.log(urlPerson, token);
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
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => removeGiftFromList(id))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }
  console.log(person);
  useEffect(() => {
    getPerson();
  }, []);
  useEffect(() => {
    getGifts();
    console.log(person);
  }, [person]);

  return (
    <Box className="gifts" w="100%">
      <Card borderRadius={10}>
        <CardHeader bg="pink.900" borderTopRadius={10}>
          <Heading
            size="lg"
            bgGradient="linear(to-r, green.200, pink.500)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            <FontAwesomeIcon icon={faGifts} color="#9be59d" width="3rem" />
            <Box display="inline" pl={1}>
              {person.name} Gift List
            </Box>
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {!gifts[0] ? (
              <Text>
                <Heading size="lg">
                  There's not Gifts for <strong>{person.name}</strong>!
                </Heading>
                <br />
                Tap the button above to add one.
              </Text>
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
        </CardBody>
      </Card>
    </Box>
  );
};

export default Gifts;
