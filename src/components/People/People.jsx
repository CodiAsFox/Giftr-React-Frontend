import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import BoxListItem from "../BoxListItem/BoxListItem";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
// import { useGiftr } from '../../context/GiftrContext';

const People = () => {
  const [people, setPeople] = useState([]);

  const [token, setToken] = useToken();
  const navigate = useNavigate();

  // setting to giftrContext
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    const url = `${api}/people`;
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

      .then((data) => {
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
        // console.log("ppl", ppl);
        setPeople(ppl);
      })
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }, []);

  return (
    <section className="people">
      <Card>
        <CardHeader>
          <Heading size="md">People List</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {people.map((person) => (
              <BoxListItem key={person.id} person={person} />
            ))}
          </Stack>
        </CardBody>
      </Card>
    </section>
  );
};

export default People;
