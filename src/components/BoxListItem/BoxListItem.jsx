import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Stack,
  Button,
  Flex,
  WrapItem,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faGifts,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { AvatarGenerator } from "random-avatar-generator";

const ListItem = (props) => {
  const navigate = useNavigate();
  const person = props.person;
  const gift = props.gift;
  const deleteItem = props.deleteItem;
  const [itemDeleted, setItemDeleted] = useState(false);

  if (person) {
    // /people (list)
    const { id, name, dob } = person;
    const jsDate = new Date(dob);
    const [date, setDate] = useState(null);
    const generator = new AvatarGenerator();
    const getAvatar = generator.generateRandomAvatar();

    function doEdit(id) {
      navigate(`/people/${id}`);
    }
    function doGifts(id) {
      navigate(`/people/${id}/gifts/`);
    }

    useEffect(() => {
      setDate(jsDate.toLocaleDateString("en", { month: 'long', day: 'numeric'}));
    }, [dob]);

    // console.log(person.gifts.length);

    const GiftCount = person.gifts.length;

    return (
      <Flex>
        <Box flex="5">
          <Stack direction={["column", "row"]} spacing="24px">
            <WrapItem>
              <Avatar name={name} src={getAvatar} />
            </WrapItem>
            <Box flex="1">
              <Heading size="xs" textTransform="uppercase">
                {name}
                <Badge ml="1" colorScheme="blue">
                  {GiftCount} {GiftCount >= 1 ? "Gift" : "Gifts"}
                </Badge>
              </Heading>
              <Text pt="2" fontSize="sm">
                {date}
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box>
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
        </Box>
      </Flex>
    );
  }

  if (gift) {
    const { id } = useParams();
    const { gift_id, gift_name, store, url } = gift;

    function doEdit(id, gift_id) {
      navigate(`/people/${id}/gifts/${gift_id}`);
    }

    function doDelete(gift_id) {
      deleteItem(gift_id);
    }

    return (
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
          <Button colorScheme="red" onClick={() => doDelete(gift_id)}>
            <FontAwesomeIcon icon={faTrash} />
            <Text pl={1}>Delete</Text>
          </Button>
        </Stack>
      </Flex>
    );
  }
};

export default ListItem;
