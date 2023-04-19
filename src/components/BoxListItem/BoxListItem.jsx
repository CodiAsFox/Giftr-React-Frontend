import { useParams, useNavigate } from "react-router-dom";
import { Box, Text, Heading, Stack, Button, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faGifts,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const ListItem = (props) => {
  const navigate = useNavigate();
  const person = props.person;
  const gift = props.gift;

  if (person) {
    const { id, name, dob } = person;
    const jsDate = new Date(dob);
    const [date, setDate] = useState(null);

    function doEdit(id) {
      navigate(`/people/${id}`);
    }
    function doGifts(id) {
      navigate(`/people/${id}/gifts/`);
    }

    useEffect(() => {
      setDate(jsDate.toLocaleDateString("en", { dateStyle: "medium" }));
    }, [dob]);
    return (
      <Flex>
        <Box flex="5">
          <Heading size="xs" textTransform="uppercase">
            {name}
          </Heading>
          <Text pt="2" fontSize="sm">
            {date}
          </Text>
        </Box>
        <Stack direction="row" spacing={4} align="center" flex="1">
          <Button
            colorScheme="blue"
            onClick={() => doEdit(id)}
            data-person={id}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <Text pl={1}>Edit</Text>
          </Button>
          <Button colorScheme="purple" onClick={() => doGifts(id)}>
            <FontAwesomeIcon icon={faGifts} />
            <Text pl={1}>View Gifts</Text>
          </Button>
        </Stack>
      </Flex>
    );
  }

  if (gift) {
    const { id } = useParams();
    const { gift_id, gift_name, store, url } = gift;
    const apiUrl = props.apiUrl;
    
    

    function doEdit(id, gift_id) {
      // navigate(`/people/${id}/gifts/${gift_id}`);
    }

    function doDelete(id, gift_id) {
      
        // navigate(`/people/${id}/gifts/${gift_id}`);
    }

    

    return (
      // <li>
      //   <div>
      //     <p className="gift-name">{gift_name}</p>
      //     <p className="gift-store">{store}</p>
      //     <p className="gift-url">{url}</p>
      //   </div>
      //   <div className="actions">
      //     <NavLink to={`/people/${id}/gifts/${gift_id}`}>Edit</NavLink>
      //     <button>DELETE</button>
      //   </div>
      // </li>
      <Flex>
        <Box flex="5">
          <Heading size="xs" textTransform="uppercase">
            {gift_name}
          </Heading>
          <Text pt="2" fontSize="sm">
            {store}
          </Text>
          <Text pt="2" fontSize="sm">
            {url}
          </Text>
        </Box>
        <Stack direction="row" spacing={4} align="center" flex="1">
          <Button
            colorScheme="blue"
            onClick={() => doEdit(id, gift_id)}
            data-person={id}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <Text pl={1}>Edit</Text>
          </Button>
          <Button colorScheme="red" onClick={() => doGifts(id)}>
            <FontAwesomeIcon icon={faTrash} />
            <Text pl={1}>Delete</Text>
          </Button>
        </Stack>
      </Flex>
    );
  }
};

export default ListItem;
