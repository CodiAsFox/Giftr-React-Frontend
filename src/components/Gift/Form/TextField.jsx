import { Box, FormLabel, Input, Text, Skeleton } from "@chakra-ui/react";

const TextField = ({ gift, setGift, loading, errors }) => {
  return (
    <Box py={2}>
      <Skeleton isLoaded={!loading}>
        <FormLabel>Gift Idea</FormLabel>
        <Input
          type="text"
          name="gift_idea"
          maxLength="80"
          placeholder="Enter your gift idea"
          _placeholder={{ opacity: 0.5, color: "blue.100" }}
          value={`${gift.txt}`}
          onChange={(ev) => setGift({ ...gift, txt: ev.target.value })}
          required
        />
        {errors.name && <Text color="red.300">{errors.name}</Text>}
      </Skeleton>
    </Box>
  );
};

export default TextField;
