import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Checkbox,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

import { ColorModeSwitcher } from "../../components/ColorModeSwitcher";
import NewChannel from "./NewChannel";
import Confirm from "../../components/Confirm";
import { deleteRoom, findAllRooms, joinRoom, leaveRoom } from "../../services/room";
import useLocalStorage from "../../hooks/useLocalStorage";
import ListItem from "./LisItem";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [query, setQuery] = useState<string>("");
  const [onlyMyChannel, setOnlyMyChannel] = useState<boolean>(false);
  const { push } = useHistory();
  const { user } = useLocalStorage();

  useEffect(() => {
    (async () => {
      const { data } = await findAllRooms();
      setRooms(data);
    })();
  }, []);

  const onNewRoomAdded = (room: Room) => {
    push(`/channel/${room._id}`);
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((x) => {
      const f1 =
        x.name.toLowerCase().indexOf(query) > -1 ||
        x.name.toLowerCase().lastIndexOf(query) > -1;
      let f2 = false;
      if (onlyMyChannel) {
        console.log(user?.id);

        f2 = x.users?.findIndex((u) => u._id === user?.id) > -1;
      } else {
        f2 = true;
      }
      return f1 && f2;
    });
  }, [query, rooms, onlyMyChannel, user]);

  const handleDeleteRoom = async () => {
    if (selectedRoom) {
      try {
        await deleteRoom(selectedRoom._id);
        setRooms((r) => r.filter((x) => x._id !== selectedRoom._id));
        setSelectedRoom(null);
      } catch (e) {}
    }
  };

  const handleJoin = async (room: Room) => {
    if (user) {
      const { data } = await joinRoom(room._id);
      setRooms(
        rooms.map((x) => {
          if (x._id === room._id) {
            return {
              ...data,
            };
          }
          return x;
        })
      );
    }
  };

  const leaveChannel = async (room: Room) => {
    if (user) {
      const { data } = await leaveRoom(room._id);
      setRooms(
        rooms.map((x) => {
          if (x._id === room._id) {
            return {
              ...data,
            };
          }
          return x;
        })
      );
    }
  };

  return (
    <Box>
      <ColorModeSwitcher right="5" position="fixed" top="3" />
      <Box mx="auto" w={['100%', '100%', 800, 800]} mt="10" px={[4,4, 'auto', 'auto']}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading
            borderBottom="1px"
            pb="5"
            mb="5"
            borderBottomColor="gray.500"
          >
            Channels to Join
          </Heading>
          <Button onClick={onOpen} leftIcon={<AddIcon />}>
            New Channel
          </Button>
        </Flex>

        <Input
          placeholder="Search in channels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Checkbox
          mt="5"
          onChange={(e) => setOnlyMyChannel(e.target.checked)}
          checked={onlyMyChannel}
        >
          Show only joined channels
        </Checkbox>
        <Flex flex="1" w="full" direction="column" my="5">
          {filteredRooms.map((room) => (
            <ListItem
              room={room}
              key={room._id}
              currentUser={user}
              onRemove={(r) => {
                setSelectedRoom(r);
              }}
              onJoin={handleJoin}
              onLeave={leaveChannel}
            />
          ))}
        </Flex>

        <NewChannel
          onFinish={onNewRoomAdded}
          size="lg"
          isOpen={isOpen}
          onClose={onClose}
        />
        <Confirm
          isOpen={Boolean(selectedRoom)}
          onClose={() => {
            setSelectedRoom(null);
          }}
          onOk={handleDeleteRoom}
          title="Are you sure to delete?"
          message="You will be lost all content of your channel"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
