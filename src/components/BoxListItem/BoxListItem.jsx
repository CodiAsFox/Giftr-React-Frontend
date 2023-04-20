import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Stack,
  HStack,
  Button,
  Flex,
  WrapItem,
  Avatar,
  Badge,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faGifts,
  faTrash,
  faShop,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
// import { AvatarGenerator } from "random-avatar-generator";

const ListItem = (props) => {
  const navigate = useNavigate();
  const person = props.person;
  const gift = props.gift;
  const deleteItem = props.deleteItem;
  const [loading, setLoading] = useState(true);

  if (person) {
    // /people (list)
    const { id, name, dob } = person;
    const jsDate = new Date(dob);
    const [date, setDate] = useState(null);
    // const generator = new AvatarGenerator();
    // const getAvatar = generator.generateRandomAvatar();

    function doEdit(id) {
      navigate(`/people/${id}`);
    }
    function doGifts(id) {
      navigate(`/people/${id}/gifts/`);
    }

    useEffect(() => {
      setDate(
        jsDate.toLocaleDateString("en", { month: "long", day: "numeric" })
      );
      setLoading(false);
    }, [dob]);

    // REQUIRES refactoring - API not structured for this + badge
    // const GiftCount = person.gifts.length;
    const GiftCount = person.giftCount;

    return (
      <Flex>
        <Box flex="5">
          <Stack direction={["column", "row"]} spacing="24px">
            <WrapItem>
              <SkeletonCircle size="48px" isLoaded={!loading}>
                <Avatar name={name} src={getAvatar} />
              </SkeletonCircle>
            </WrapItem>
            <Box flex="1">
              <Heading size="xs" textTransform="uppercase">
                {name}
                {/* <Badge ml="1" colorScheme="blue">
                  {GiftCount} {GiftCount >= 1 ? "Gift" : "Gifts"}
                </Badge> */}
              </Heading>
              <Text pt="2" fontSize="sm">
                {date}
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Skeleton isLoaded={!loading}>
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
          </Skeleton>
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

    useEffect(() => {
      setLoading(false);
    }, [gift_id]);

    function doDelete(gift_id) {
      deleteItem(gift_id);
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    function DeleteConfirm({ giftId }) {
      console.log(giftId);
      return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Do you want to delete {gift_name}?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                This action will permanently delete the gift and all it's data.
                This action is irreversible.
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={() => doDelete(giftId)}>
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
    }

    return (
      <Flex>
        <Box flex="5">
          <Box flex="1">
            <Skeleton isLoaded={!loading}>
              <Box flex="1">
                <Text size="md" textTransform="uppercase">
                  {gift_name}
                </Text>
              </Box>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <Stack direction="row" spacing={4} align="top" flex="1" pt={3}>
                <Box>
                  <HStack bg="green.700" p="5px 15px" borderRadius={20}>
                    <Flex alignItems="center" fontSize="sm">
                      <FontAwesomeIcon icon={faShop} />
                      <Text pl={2} fontWeight="bold" fontSize="sm">
                        {store}
                      </Text>
                    </Flex>
                  </HStack>
                </Box>
                <Box>
                  <Link href="{url}" isExternal>
                    <HStack bg="orange.600" p="5px 15px" borderRadius={20}>
                      {url}
                      <Flex alignItems="center" fontSize="sm">
                        <FontAwesomeIcon icon={faGlobe} />
                        <Text pl={2} fontWeight="bold" fontSize="sm">
                          View website <ExternalLinkIcon mx="2px" />
                        </Text>
                      </Flex>
                    </HStack>
                  </Link>
                </Box>
              </Stack>
            </Skeleton>
          </Box>
        </Box>
        <Box>
          <Skeleton isLoaded={!loading}>
            <Stack direction="row" spacing={4} align="center" flex="1">
              <Button
                colorScheme="blue"
                onClick={() => doEdit(id, gift_id)}
                data-person={id}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                <Text pl={1}>Edit</Text>
              </Button>

              <Button colorScheme="red" onClick={onOpen}>
                <DeleteConfirm giftId={gift_id} />
                <FontAwesomeIcon icon={faTrash} />
                <Text pl={1}>Delete</Text>
              </Button>
            </Stack>
          </Skeleton>
        </Box>
      </Flex>
    );
  }
};

export default ListItem;
