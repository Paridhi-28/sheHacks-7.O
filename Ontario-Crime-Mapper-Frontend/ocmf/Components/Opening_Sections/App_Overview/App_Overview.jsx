import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import Data from "../../../Data/App_Overview/App_Overview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBook,
  faClock,
  faMagnifyingGlass,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function App_Overview() {
  return (
    <>
      <Box p="30px" py="50px">
        <Box pb="20px">
          <Heading>Our Features</Heading>
        </Box>

        <Divider />
        <Box pt="30px">
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDir={{ base: "column", md: "row" }}
          >
            {Data.featureList.map((feature, key) => {
              return (
                <Card
                  direction={{ base: "column", sm: "row" }}
                  variant="none"
                  p="10px"
                  key={key}
                  w={{ base: "100%", md: "50%" }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FontAwesomeIcon icon={feature.Icon} size="4x" />
                  </Box>

                  <Box>
                    <CardBody>
                      <Heading size="md">{feature.Title}</Heading>
                      <Text py="2" color="whiteAlpha.500">
                        {feature.Description}
                      </Text>
                    </CardBody>
                  </Box>
                </Card>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
