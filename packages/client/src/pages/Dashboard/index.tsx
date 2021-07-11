import { AddIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Box, Flex, Heading, Input, Button, Checkbox, useDisclosure } from '@chakra-ui/react';

import ListItem from './LisItem';
import NewChannel from './NewChannel';
import Header from '../../components/Header';
import Confirm from '../../components/Confirm';
import useLocalStorage from '../../hooks/useLocalStorage';
import { deleteRoom, findAllRooms, joinRoom, leaveRoom } from '../../services/room';

const Dashboard = () => {
  const { push } = useHistory();
  const { user } = useLocalStorage();
  const [query, setQuery] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onlyMyChannel, setOnlyMyChannel] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await findAllRooms();
      setRooms(data);
    })();
  }, []);

  const updateRooms = (roomId: string, newRoom: Room) =>
    setRooms(
      rooms.map((room) => {
        if (room._id === roomId) {
          return newRoom;
        }
        return room;
      }),
    );

  const filteredRooms = useMemo(
    () =>
      rooms.filter((x) => {
        const myChannelsFilter =
          !onlyMyChannel || x.users?.findIndex((u) => u._id === user?._id) > -1;
        const nameFilter = x.name.toLowerCase().indexOf(query) > -1;

        return nameFilter && myChannelsFilter;
      }),
    [query, rooms, onlyMyChannel, user],
  );

  const handleDeleteRoom = async () => {
    if (selectedRoom) {
      try {
        await deleteRoom(selectedRoom._id);
        setRooms((r) => r.filter((x) => x._id !== selectedRoom._id));
        setSelectedRoom(null);
      } catch (e) {
        console.error(e);
        // TODO
      }
    }
  };

  const handleJoin = async (room: Room) => {
    const { data } = await joinRoom(room._id);
    updateRooms(room._id, data);
  };

  const leaveChannel = async (room: Room) => {
    const { data } = await leaveRoom(room._id);
    updateRooms(room._id, data);
  };

  return (
    <Box>
      <Header />
      <Box mx='auto' w={['100%', '100%', 800, 800]} mt='4' px={[4, 4, 'auto', 'auto']}>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading borderBottom='1px' pb='5' mb='5' borderBottomColor='gray.500'>
            Channels to Join
          </Heading>
          <Button onClick={onOpen} leftIcon={<AddIcon />}>
            New Channel
          </Button>
        </Flex>
        <Input
          value={query}
          placeholder='Search in channels...'
          onChange={(e) => setQuery(e.target.value)}
        />
        <Checkbox
          mt='5'
          checked={onlyMyChannel}
          onChange={(e) => setOnlyMyChannel(e.target.checked)}
        >
          Show only joined channels
        </Checkbox>
        <Flex flex='1' w='full' direction='column' my='5'>
          {filteredRooms.map((room) => (
            <ListItem
              room={room}
              key={room._id}
              currentUser={user}
              onJoin={handleJoin}
              onLeave={leaveChannel}
              onRemove={(room) => setSelectedRoom(room)}
            />
          ))}
        </Flex>
        <NewChannel
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
          onFinish={(room) => push(`/channel/${room._id}`)}
        />
        <Confirm
          onOk={handleDeleteRoom}
          title='Are you sure to delete?'
          isOpen={Boolean(selectedRoom)}
          onClose={() => setSelectedRoom(null)}
          message='You will be lost all content of your channel'
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
