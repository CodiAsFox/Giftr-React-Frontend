import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Skeleton,
} from "@chakra-ui/react";
import { usePage } from "../../context/PageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCirclePlus,
  faFloppyDisk,
  faTrash,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";

const Gift = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  // page context for navigation
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const personId = params.id;
  const giftId = params.giftId;
  const [page, updatePage] = usePage();

  const shape = {
    txt: "",
    store: "",
    url: "",
  };
  const [errors, setErrors] = useState(shape);

  const [gift, setGift] = useState({ ...shape });
  useEffect(() => {
    updatePage({ ...page, page: "gift/add", id: personId });
  }, []);

  function saveGift() {
    if (validateForm()) {
      //PATCH
      if (giftId) updateGift(gift);

      // POST
      if (!giftId) postGift(gift);
    }
  }

  function doDelete() {
    deleteGift(giftId);
  }
  // API GET, POST, PATCH, DELETE
  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people/${personId}/gifts`;

  function getGift() {
    // api/people/${id}/gifts/${giftId}
    let endpoint = `${url}/${giftId}`;
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
      .then((data) => {
        setGift(data);
      })
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  function postGift(data) {
    let request = new Request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  function updateGift(data) {
    let endpoint = `${url}/${giftId}`;
    let request = new Request(endpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response");

        return res.json();
      })
      .then(() => navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  function deleteGift(giftId) {
    // api/people/${id}
    let endpoint = `${url}/${giftId}`;
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
      .then(() => navigate(`/people/${personId}/gifts`))
      .catch((err) => {
        console.warn(err.message);
        setToken(null);
        navigate("/");
      });
  }

  function validateForm() {
    const newErrors = {
      txt: "",
      store: "",
      url: "",
    };

    console.log(gift);

    if (!gift.txt.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!gift.store.trim()) {
      newErrors.store = "Store name is required.";
    }
    if (!gift.url.trim()) {
      newErrors.url = "The URL is required.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  function DeleteConfirm() {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Do you want to delete {gift.txt}?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              This action will permanently delete the gift and all it's data.
              This action is irreversible.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={doDelete}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  useEffect(() => {
    if (giftId) {
      getGift(); // fill the inputs with data from GET fetch
    }
    setLoading(false);
  }, []);

  return (
    <Box className="Gift">
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
              <FontAwesomeIcon
                icon={faPersonCirclePlus}
                color="#25DAD6"
                width="3rem"
              />
            </Text>
            <Text
              size="lg"
              bgGradient="linear(to-r, teal.500, pink.300, pink.500)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
              display="inline-block"
              pl="3"
            >
              {giftId ? `Edit ${gift.txt}` : "Add gift"}
            </Text>
          </Skeleton>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl isRequired>
              <Box>
                <Box py={2}>
                  <Skeleton isLoaded={!loading}>
                    <FormLabel>Gift Idea</FormLabel>
                    <Input
                      type="text"
                      name="gift_idea"
                      maxLength="80"
                      placeholder="Enter your gift idea"
                      value={`${gift.txt}`}
                      onChange={(ev) =>
                        setGift({ ...gift, txt: ev.target.value })
                      }
                      required
                    />
                    {errors.name && <Text color="red.300">{errors.name}</Text>}
                  </Skeleton>
                </Box>
                <Box py={2}>
                  <Skeleton isLoaded={!loading}>
                    <FormLabel>Store</FormLabel>
                    <Input
                      type="text"
                      name="store"
                      placeholder="Enter store name"
                      maxLength="80"
                      value={`${gift.store}`}
                      onChange={(ev) =>
                        setGift({ ...gift, store: ev.target.value })
                      }
                      required
                    />
                    {errors.store && (
                      <Text color="red.300">{errors.store}</Text>
                    )}
                  </Skeleton>
                </Box>
                <Box py={2}>
                  <Skeleton isLoaded={!loading}>
                    <FormLabel>Url</FormLabel>
                    <Input
                      type="url"
                      name="url"
                      maxLength="80"
                      placeholder="https://thestore.com/example"
                      value={`${gift.url}`}
                      onChange={(ev) =>
                        setGift({ ...gift, url: ev.target.value })
                      }
                      required
                    />
                    {errors.url && <Text color="red.300">{errors.url}</Text>}
                  </Skeleton>
                </Box>
              </Box>
              <Box className="formBox" pt={4}>
                <Skeleton isLoaded={!loading}>
                  <Button
                    colorScheme="green"
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={600}
                    mr={3}
                    onClick={saveGift}
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    <Text pl={1}>Save</Text>
                  </Button>
                  {giftId ? (
                    <Button
                      colorScheme="red"
                      as={"a"}
                      fontSize={"sm"}
                      fontWeight={600}
                      mr={3}
                      onClick={onOpen}
                    >
                      <DeleteConfirm />
                      <FontAwesomeIcon icon={faTrash} />
                      <Text pl={1}>Delete</Text>
                    </Button>
                  ) : (
                    <Button
                      colorScheme="red"
                      as={"a"}
                      fontSize={"sm"}
                      fontWeight={600}
                      mr={3}
                      href={`/people/${personId}/gifts/`}
                    >
                      <FontAwesomeIcon icon={faRectangleXmark} />
                      <Text pl={1}>Cancel</Text>
                    </Button>
                  )}
                </Skeleton>
              </Box>
            </FormControl>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Gift;
