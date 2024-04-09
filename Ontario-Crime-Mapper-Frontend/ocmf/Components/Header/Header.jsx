"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import logout from "../../lib/logout";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Data from "../../Data/Header/Header";

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
      color="whiteAlpha.600"
      fontSize="16px"
    >
      {children}
    </Box>
  );
};

export default function Header(username) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);

  return (
    <>
      <Box
        backdropFilter="blur(10px) hue-rotate(0deg)"
        pos="sticky"
        top="0"
        zIndex="10"
        bg="blackAlpha.500"
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Heading fontSize="2xl">CrimeVue</Heading>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Data.HeaderLinks.map((link) => (
                <NavLink key={Data.HeaderLinks}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          {!username.props ? (
            <>
              <Flex alignItems={"center"}>
                <Link href={`${Data.HeaderBtns[1].href}`}>
                  <Button
                    variant={"outline"}
                    colorScheme={"teal"}
                    size={"sm"}
                    mr={4}
                  >
                    {Data.HeaderBtns[1].name}
                  </Button>
                </Link>
                <Link href={`${Data.HeaderBtns[0].href}`}>
                  <Button colorScheme={"teal"} variant={"solid"} size={"sm"}>
                    {Data.HeaderBtns[0].name}
                  </Button>
                </Link>
              </Flex>
            </>
          ) : (
            <>
              <Popover>
                <PopoverTrigger>
                  <Button>
                    <Image src="/Header/police.png" h="80%" pr="10px" />
                    {username.props}
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>
                      Hello Officer, {username.props}
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Flex flexDir="column" gap="10px">
                        <Button justifyContent="start" variant="ghost">
                          Profile
                        </Button>
                        <Button justifyContent="start" variant="ghost">
                          Notifications
                        </Button>
                      </Flex>
                    </PopoverBody>
                    <PopoverFooter>
                      <Center>
                        <Button
                          colorScheme="teal"
                          h="27px"
                          onClick={() => logout(router, setAuth)}
                        >
                          Logout
                        </Button>
                      </Center>
                    </PopoverFooter>
                  </PopoverContent>
                </Portal>
              </Popover>
            </>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Data.HeaderLinks.map((link) => (
                <NavLink key={link}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
