import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { usePage } from "../../context/PageContext";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import BoxListItem from "../BoxListItem/BoxListItem";

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const [token, setToken] = useToken();

  const { id } = useParams();

  const [page, updatePage] = usePage();

  useEffect(() => {
    updatePage({ ...page, page: "gifts", id: id });
    console.log(page);
  }, []);

  // API Call Functions (GET, DELETE)
  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people/${id}/gifts`;
  // console.log("person id: " + id);

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
        // console.log(gfts);
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
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  useEffect(() => {
    getGifts();
  }, []);

  return (
    <section className="gifts">
      <Card>
        <CardHeader>
          <Heading size="md">Gift List</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {gifts.map((gift) => (
              // <BoxListItem key={gift.gift_id} gift={gift} apiUrl={url} />
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
