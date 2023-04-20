import { Box, FormLabel, Input, Text, Skeleton } from "@chakra-ui/react";

const URLField = ({ gift, setGift, loading, errors }) => {
  return (
    <Box py={2}>
      <Skeleton isLoaded={!loading}>
        <FormLabel>Url</FormLabel>
        <Input
          type="url"
          name="url"
          maxLength="80"
          placeholder="https://thestore.com/example"
          _placeholder={{ opacity: 0.5, color: "blue.100" }}
          value={`${gift.url}`}
          onChange={(ev) => setGift({ ...gift, url: ev.target.value })}
          required
        />
        {errors.url && <Text color="red.300">{errors.url}</Text>}
      </Skeleton>
    </Box>
  );
};

export default URLField;
