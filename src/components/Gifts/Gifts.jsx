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
} from "@chakra-ui/react";
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
    <section className="gifts">
      <Card>
        <CardHeader>
          <Heading size="md">Gift List</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {!gifts[0] ? (
              <Text>
                There's not Gifts for <strong>{person.name}</strong>!
              </Text>
            ) : (
              "=D"
            )}
            {gifts.map((gift) => (
              <BoxListItem
                key={gift.gift_id}
                gift={gift}
                deleteItem={deleteGift}
              />
            ))}
          </Stack>
        </CardBody>
      </Card>
    </section>
  );
};

export default Gifts;
