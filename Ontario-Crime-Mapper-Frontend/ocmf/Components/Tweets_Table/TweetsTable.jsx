import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Badge,
  Text,
} from "@chakra-ui/react";
import PaginationComponent from "./Pagination/Pagination";
import { useState } from "react";

function LocationCheck(location) {
  if (location == undefined) {
    return "No Location Given";
  }
  if (typeof location == "string") {
    return location;
  }
  var longest = location.sort(function (a, b) {
    return b.length - a.length;
  })[0];

  return longest;
}

export default function TweetsTable(tweet) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedData = tweet.props.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <>
      <TableContainer scrollBehavior="auto" overflow-y="auto">
        <Table variant="simple" size="sm">
          <Thead bg="blackAlpha.500">
            <Tr>
              <Th position="sticky" top="0">
                Person Information
              </Th>
              <Th position="sticky" top="0">
                Crime Description
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((value, key) => {
              return (
                <Tr whiteSpace="normal" key={key}>
                  <Td w="50%">
                    <Box display="flex" gap="10px" flexDir="column">
                      {value.ImageUrl != "No Image" ? (
                        <Popover>
                          <PopoverTrigger>
                            <Button size="sm">Image</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader minW="fit-content">
                              Person name: {value.Name}
                            </PopoverHeader>
                            <PopoverBody
                              minW="fit-content"
                              display="flex"
                              justifyContent="center"
                            >
                              <img
                                src={value.ImageUrl}
                                alt=""
                                style={{ height: "150px", width: "150px" }}
                              />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <></>
                      )}

                      <Box>
                        <b>Status:</b> {value.Status}
                        <br />
                        {value.Name ? (
                          <>
                            <b>Name:</b> {value.Name}
                            <br />
                          </>
                        ) : (
                          <></>
                        )}
                        {value.Age ? (
                          <>
                            <b>Age:</b> {value.Age}
                            <br />
                          </>
                        ) : (
                          <></>
                        )}
                        <b>Date:</b> {value.TweetedTime}
                        {/* {value.Location} */}
                        <br />
                        <b>Location:</b> {LocationCheck(value.Location)}
                      </Box>
                    </Box>
                  </Td>
                  <Td whiteSpace="normal">{value.Description}</Td>
                </Tr>
              );
            })}
          </Tbody>
          <TableCaption m="0">
            <PaginationComponent
              pageCount={Math.ceil(tweet.props.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
            <Badge colorScheme="blue">
              <Text>@TPSOperations</Text>
            </Badge>
          </TableCaption>
        </Table>
      </TableContainer>
    </>
  );
}
