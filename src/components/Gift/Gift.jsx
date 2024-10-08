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
    cleanUpData(validatedGift);

    if (validateForm()) {
      //PATCH
      if (giftId) updateGift(validatedGift);

      // POST
      if (!giftId) postGift(validatedGift);
    }
  }

  function cleanUpData(giftObj) {
    if (!gift.url.startsWith("https://")) {
      let urlPrefix = "https://";
      giftObj.url = urlPrefix + giftObj.url;
    }

    giftObj.txt = giftObj.txt.trim();
    giftObj.store = giftObj.store.trim();
    giftObj.url = giftObj.url.trim();

    setGift(giftObj);
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
                width="48px"
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
