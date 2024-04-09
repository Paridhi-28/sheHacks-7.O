"use client";
import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LoginForm() {
  const router = useRouter();

  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emailRef = useRef();
  const errorRef = useRef();

  const login_url = "/api/User/login";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  async function submit(e) {
    e.preventDefault();
    if (email == "" || password == "") {
      setErrorMsg("Please enter Email and Password")
      return;
    }
    try {
      const response = await axios.post(
        login_url,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response.data.accessToken;
      cookie.set("refresh_jwt", response.data.refreshToken, { expires: 24 });
      setAuth({ email, password, accessToken });
      router.push(`${window.location.origin}/ProtectedRoutes/HomePage`);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMsg(`Email or password incorrect`);
      } else if (error.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errorRef.current.focus();
    }
  }

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack w={{ base: "90%", md: "md" }} spacing={8} py={12}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign In</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Box>
              <Center>
                <Heading pb="15px">
                  <Link
                    href="/"
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
                    CrimeVue
                  </Link>
                </Heading>
              </Center>
            </Box>
            {errorMsg ? (
              <>
                <Text ref={errorRef} py="10px" color="red">
                  {errorMsg}
                </Text>
              </>
            ) : (
              <>
                <Text ref={errorRef}></Text>
              </>
            )}
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  ref={emailRef}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={4}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"teal.400"}>Forgot password?</Text>
                </Stack>
                <Center>
                  <Stack>
                    <Text color={"teal.400"}>
                      <Link href="/registerPage">Create a Account?</Link>
                    </Text>
                  </Stack>
                </Center>
                <Button
                  bg={"teal"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                  onClick={submit}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
