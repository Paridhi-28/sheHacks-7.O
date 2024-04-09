import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";

export default function MapSneakP() {
  return (
    <>
      <Box>
        <Box px="20px">
          <Center>
            <Box p="20px">
              <Heading size="lg" color="whiteAlpha.600">
                Our Interactive Map
              </Heading>
            </Box>
          </Center>
          <Box>
            <Flex alignItems="center" flexDir={{ base: "column", lg: "row" }}>
              <Box>
                {" "}
                <Text
                  fontSize="xl"
                  px="30px"
                  py={{ base: "20px", lg: "0" }}
                  textAlign={{ base: "center", lg: "" }}
                  color="whiteAlpha.600"
                >
                  Explore crime incidents effortlessly using our interactive
                  map. Our specially designed markers simplify the
                  identification of various crime types, providing you with a
                  quick and clear snapshot of the local crime scenario.
                </Text>
              </Box>
              <Box
                backgroundImage="/SneakPeak/MapSC.png"
                h="400px"
                w={{ base: "100%", lg: "2000px" }}
                bgPosition="center"
                bgRepeat="no-repeat"
                backgroundSize="cover"
                boxShadow="0 0 10px 10px white inset"
                borderRadius="10px"
              ></Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}
