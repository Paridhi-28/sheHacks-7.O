import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import CityAni from "./Animations/CityAni";

export default function OpeningSection() {
  return (
    <>
      <Box px="30px">
        <Box pt="80px" pb="120px">
          <Box>
            <Flex
              flexDir={{
                base: "column",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
              gap="10px"
            >
              <Box w="fit-content" pr="30px">
                <Heading
                  size={{
                    base: "2xl",
                    lg: "3xl",
                    xl: "2xl",
                    "2xl": "3xl",
                  }}
                >
                  Stay Informed. <br /> Empower Your Safety
                </Heading>
                <Text
                  pt="10px"
                  fontSize={{ md: "2xl", lg: "2xl", xl: "2xl", "2xl": "3xl" }}
                  color="whiteAlpha.600"
                >
                  Explore crime incidents in your neighborhood with a single
                  click.
                </Text>
              </Box>
              <Flex justifyContent={{ base: "center", lg: "start" }}>
                <Box
                  w={{
                    base: "300px",
                    sm: "300px",
                    md: "200px",
                    lg: "300px",
                    xl: "400px",
                  }}
                >
                  <CityAni />
                </Box>
              </Flex>
            </Flex>
            <Box h="100%"></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
