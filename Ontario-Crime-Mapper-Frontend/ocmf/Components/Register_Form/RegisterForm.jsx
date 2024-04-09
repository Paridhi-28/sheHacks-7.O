"use client";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function RegisterPage() {
  const router = useRouter();
  const userTest = /^[a-zA-Z]{5,15}$/;
  const emailTest =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordTest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [showPassword, setShowPassword] = useState(false);

  const register_url = "/api/User/register";

  const userRef = useRef();
  const errorRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [fname, setFName] = useState("");

  const [lname, setLName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordMatch, setpasswordMatch] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setName(`${fname}${lname}`);
  }, [fname, lname]);

  useEffect(() => {
    const testResult = userTest.test(name);
    setValidName(testResult);
  }, [name]);

  useEffect(() => {
    const testResult = emailTest.test(email);
    setValidEmail(testResult);
  }, [email]);

  useEffect(() => {
    const testResult = passwordTest.test(password);
    setValidPassword(testResult);
    // const bothMatching = password == passwordMatch;
    // setValidMatch(bothMatching);
  }, [password, passwordMatch]);

  useEffect(() => {
    setErrorMsg("");
  }, [fname, lname, email, password, passwordMatch]);

  useEffect(() => {
    errorRef.current.focus();
  }, [errorMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check whether Info passes tests again
    const testuser = userTest.test(name);
    const testemail = emailTest.test(email);
    const testpassword = passwordTest.test(password);

    if (!testuser || !testpassword || !testemail) {
      setErrorMsg("Invalid Entries");
      return;
    }

    try {
      const response = await axios.post(
        register_url,
        JSON.stringify({ name, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoggedIn(true);
      setName("");
      setEmail("");
      setPassword("");
      setpasswordMatch("");
      router.push(`${window.location.origin}/ProtectedRoutes/HomePage`);
    } catch (error) {
      if (!error?.response) {
        console.log(error);
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Email Already Taken");
      } else {
        setErrorMsg("Registration Failed");
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
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
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    ref={userRef}
                    onChange={(e) => {
                      setFName(e.target.value);
                    }}
                    value={fname}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setLName(e.target.value);
                    }}
                    value={lname}
                  />
                </FormControl>
              </Box>
            </HStack>
            {/* <Box>
              <Text
                id="uidnote"
                display={nameFocus && name && !validName ? "" : "none"}
                color="grey"
                pl="10px"
              >
                {" "}
                6 to 15 characters.
                <br />
                Must begin with a Capital letter.
                <br />
                Numbers, underscores, hyphens not allowed.
              </Text>
            </Box> */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailNote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordNote"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box>
                <Text
                  id="passwordNote"
                  display={
                    passwordFocus && password && !validPassword ? "" : "none"
                  }
                  color="grey"
                  pl="10px"
                >
                  <br />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </Text>
              </Box>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"teal"}
                color={"white"}
                _hover={{
                  bg: "teal.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"teal"} href="/loginPage">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
