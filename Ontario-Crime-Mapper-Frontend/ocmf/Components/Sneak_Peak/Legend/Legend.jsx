import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Data from "../../../Data/Sneak_Peak/Legend/LegendD";

export default function Legend() {
  return (
    <>
      <Box>
        <Flex flexWrap="wrap" gap="10px" justifyContent="center">
          {Data.Legend.map((item, key) => {
            return (
              <Popover key={key}>
                <PopoverTrigger>
                  <Button p="20px">
                    {" "}
                    <Image
                      src={`/Icon_Images/${item.svg}.svg`}
                      alt="My SVG"
                      width={35}
                      height={35}
                    />
                    <Text pl="10px">{item.Name}</Text>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>{item.Name}</PopoverHeader>
                  <PopoverBody>{item.Description}</PopoverBody>
                </PopoverContent>
              </Popover>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}
