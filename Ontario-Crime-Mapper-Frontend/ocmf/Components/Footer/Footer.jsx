"use client";

import {
  Box,
  chakra,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub, FaHome, FaLinkedin } from "react-icons/fa";

const Logo = (props) => {
  return (
    <>
      <Heading size="md">CrimeVue</Heading>
    </>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>© 2024 CrimeVue. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Github"} href={"https://github.com/Humza-Aa"}>
            <FaGithub />
          </SocialButton>
          <SocialButton
            label={"LinkedIn"}
            href={"https://linkedin.com/in/humza-aamir"}
          >
            <FaLinkedin />
          </SocialButton>
          <SocialButton
            label={"Portfolio"}
            href={"https://humza-aamir.vercel.app/"}
          >
            <FaHome />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
