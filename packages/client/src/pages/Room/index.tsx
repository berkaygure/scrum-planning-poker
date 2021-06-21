import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Avatar,
  Text,
  AvatarBadge,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiImport } from "react-icons/bi";

import { ColorModeSwitcher } from "../../components/ColorModeSwitcher";
import { findRoom } from "../../services/room";
import socketIOClient, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import useLocalStorage from "../../hooks/useLocalStorage";

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room>();
  const { user } = useLocalStorage();
  const [onlineUsers, setOnlineUsers] = useState<
    { room: string; userId: string; id: string }[]
  >([]);
  const ws = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  React.useEffect(() => {
    ws.current = socketIOClient("http://localhost:8080");
  }, []);

  React.useEffect(() => {
    if (ws.current) {
      ws.current.on("onlineUsers", function (data) {
        setOnlineUsers(data.users);
      });
    }
  }, [ws]);

  useEffect(() => {
    ws.current?.emit("joinRoom", { room: room?._id, userId: user?.id });
  }, [room, user]);

  useEffect(() => {
    (async () => {
      const { data } = await findRoom(id);
      setRoom(data);
    })();
  }, [id]);

  const isOnline = (userId: string) => {
    return onlineUsers.findIndex((x) => x.userId === userId) > -1;
  };

  return (
    <Box h="100vh">
      <ColorModeSwitcher right="5" position="fixed" top="3" />
      <Flex mx="auto" w="1200px" h="100vh">
        <Box flex="1" mt="10">
          <Heading borderBottom="1px" borderColor="gray.600" pb="3">
            #{room?.name}
          </Heading>
          <Box py="3">
            {room && room.owner._id === user?.id && (
              <Button w="full" colorScheme="blue">
                Start
              </Button>
            )}
            {room && room.users.findIndex((x) => x._id === user?.id) === -1 && (
              <Button w="full" mt="2">
                Join
              </Button>
            )}
          </Box>
          <Box py="3">
            <Heading
              borderBottom="1px"
              fontSize="2xl"
              pb="3"
              borderColor="gray.600"
            >
              Attendees
            </Heading>
          </Box>
          <Box>
            {room?.users.map((e) => (
              <Flex key={e._id} mb="3" alignItems="center">
                <Avatar name={e.name} mr="5">
                  <AvatarBadge
                    boxSize="1.25em"
                    bg={isOnline(e._id) ? "green.500" : "gray.300"}
                  />
                </Avatar>
                <Text fontSize="lg">{e.name}</Text>
              </Flex>
            ))}
          </Box>
          <Box py="3">
            <Flex
              borderBottom="1px"
              pb="3"
              justifyContent="space-between"
              alignItems="center"
              borderColor="gray.600"
            >
              <Heading fontSize="2xl">Tasks</Heading>
              <Stack direction="row">
                <IconButton
                  rounded="md"
                  aria-label="Add Task"
                  icon={<IoIosAddCircleOutline />}
                />
                <IconButton
                  rounded="md"
                  aria-label="Add Task"
                  icon={<BiImport />}
                />
              </Stack>
            </Flex>
          </Box>
        </Box>
        <Box
          flex="2"
          mt="10"
          h="95vh"
          borderLeft="1px"
          borderRight="1px"
          borderColor="gray.600"
          ml="5"
          px="4"
        >
          <Heading>Current Task</Heading>
          <Box>
              <Button>
                    10
              </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Room;
