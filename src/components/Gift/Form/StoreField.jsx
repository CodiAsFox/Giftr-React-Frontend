import { Box, FormLabel, Input, Text, Skeleton } from "@chakra-ui/react";

const StoreField = ({ gift, setGift, loading, errors }) => {
  return (
    <Box py={2}>
      <Skeleton isLoaded={!loading}>
        <FormLabel>Store</FormLabel>
        <Input
          type="text"
          name="store"
          placeholder="Enter store name"
          _placeholder={{ opacity: 0.5, color: "blue.100" }}
          maxLength="80"
          value={`${gift.store}`}
          onChange={(ev) => setGift({ ...gift, store: ev.target.value })}
          required
        />
        {errors.store && <Text color="red.300">{errors.store}</Text>}
      </Skeleton>
    </Box>
  );
};

export default StoreField;
