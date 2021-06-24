import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ColorModeSwitcher } from '../../components/ColorModeSwitcher';
import { findRoom } from '../../services/room';
import socketIOClient, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import useLocalStorage from '../../hooks/useLocalStorage';
import NewTask from './NewTask';
import AttendeeList from './components/AttendeeList';
import TaskList from './components/TaskList';

const Room = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room>();
  const { user } = useLocalStorage();
  const [onlineUsers, setOnlineUsers] = useState<{ room: string; userId: string; id: string }[]>(
    [],
  );
  const ws = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  React.useEffect(() => {
    ws.current = socketIOClient('http://localhost:8080');
  }, []);

  React.useEffect(() => {
    if (ws.current) {
      ws.current.on('onlineUsers', function (data) {
        setOnlineUsers(data.users);
      });
    }
  }, [ws]);

  useEffect(() => {
    ws.current?.emit('joinRoom', { room: room?._id, userId: user?.id });
  }, [room, user]);

  useEffect(() => {
    (async () => {
      const { data } = await findRoom(id);
      setRoom(data);
    })();
  }, [id]);

  const onNewTaskAdded = (tasks: Task[]) => {
    setRoom({
      ...room!,
      tasks,
    });
    onClose();
  };

  return (
    <Box h='100vh'>
      <ColorModeSwitcher right='5' position='fixed' top='3' />
      <Flex mx='auto' p='10' h='full'>
        <Box flex='1'>
          <Heading borderBottom='1px' borderColor='gray.600' pb='3'>
            #{room?.name}
          </Heading>
          <Box py='3'>
            {room && room.owner._id === user?.id && (
              <Button w='full' colorScheme='blue'>
                Start
              </Button>
            )}
            {room && room.users.findIndex((x) => x._id === user?.id) === -1 && (
              <Button w='full' mt='2'>
                Join
              </Button>
            )}
          </Box>
          {room && <AttendeeList attendees={room.users} onlineUsers={onlineUsers} />}
          {room && <TaskList tasks={room.tasks} onOpen={onOpen} />}
        </Box>
        <Box
          flex='3'
          h='full'
          borderLeft='1px'
          borderRight='1px'
          borderColor='gray.600'
          ml='5'
          px='4'
        >
          <Heading>Current Task</Heading>
          <Box>
            <Button>10</Button>
          </Box>
        </Box>
        <Box flex='1' ml='5'>
          <Heading borderBottom='1px' borderColor='gray.600' pb='3'>
            Score Table
          </Heading>
        </Box>
      </Flex>
      {room && (
        <NewTask
          roomId={room?._id}
          onFinish={onNewTaskAdded}
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default Room;
