

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGiftAPI from "../../api/useGiftAPI";
import CheckToken from "../../auth/CheckToken";
import { usePage } from "../../context/PageContext";
import { useToken } from "../../context/TokenContext";
import DeleteConfirm from "./Form/DeleteConfirm";
import GiftActions from "./Form/Actions";
import StoreField from "./Form/StoreField";
import TextField from "./Form/TextField";
import UrlField from "./Form/UrlField";


const Gift = () => {
  const [token, setToken] = useToken();

  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);
  const params = useParams();
  const personId = params.id;
  const giftId = params.giftId;
  const [page, updatePage] = usePage();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

    const validatedGift = {...gift};
    if(!gift.url.startsWith('https://')) {
      let urlPrefix = 'https://';
      validatedGift.url = urlPrefix + validatedGift.url;
      setGift(validatedGift);
    }

    if (validateForm()) {
      //PATCH
      if (giftId) updateGift(validatedGift);

      // POST
      if (!giftId) postGift(validatedGift);
    }
  }

  function doDelete() {
    deleteGift(giftId);
  }

  const api = import.meta.env.VITE_API_URL;
  const url = `${api}/people/${personId}/gifts`;

  const { getGift, postGift, updateGift, deleteGift } = useGiftAPI(
    token,
    setToken,
    personId,
    giftId,
    url,
    navigate,
    setGift
  );

  function validateForm() {
    const newErrors = {
      txt: "",
      store: "",
      url: "",
    };

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
      getGift();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (gift.txt) {
      setName(gift.txt);
    }
  }, []);
  const giftName = gift.txt;
  return (
    <Box className="Gift">

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
              <FontAwesomeIcon
                icon={faPersonCirclePlus}
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

              {giftId ? `Edit ${giftName}` : "Add gift"}
            </Heading>

          </Skeleton>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl isRequired>

              <TextField
                gift={gift}
                setGift={setGift}
                loading={loading}
                errors={errors}
              />
              <StoreField
                gift={gift}
                setGift={setGift}
                loading={loading}
                errors={errors}
              />
              <UrlField
                gift={gift}
                setGift={setGift}
                loading={loading}
                errors={errors}
              />

              <GiftActions
                giftId={giftId}
                saveGift={saveGift}
                onOpen={onOpen}
                personId={personId}
              />

            </FormControl>
          </Stack>
        </CardBody>
      </Card>

      <DeleteConfirm
        isOpen={isOpen}
        onClose={onClose}
        doDelete={doDelete}
        gift={gift}
      />

    </Box>
  );
};

export default Gift;
