import { Box, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import MapSneakP from "./MapSP/MapSP";
import Legend from "./Legend/Legend";

export default function SneakPeak() {
  return (
    <>
      <Box p="30px">
        <Box pb="20px">
          <Heading>Want a Sneak Peak?</Heading>
        </Box>
        <Divider />
        <Box pt="20px">
          <MapSneakP />
        </Box>
        <Box py="40px">
          <Center>
            <Heading size="lg" color="whiteAlpha.600" py="20px">
              Legend
            </Heading>
          </Center>
          <Legend />
        </Box>
      </Box>
    </>
  );
}
