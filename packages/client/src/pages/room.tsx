/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Container, Flex, useDisclosure, VStack } from '@chakra-ui/react';

import { useSocket } from 'hooks/useSocket';
import VotePanel from 'components/VotePanel';
import Header from 'components/shared/Header';
import CurrentTask from 'components/CurrentTask';
import AttendeeList from 'components/AttendeeList';
import ManageTaskDrawer from 'components/ManageTask/Drawer';
import AddTaskForm from 'components/ManageTask/AddTaskForm';
import Tasks from 'components/ManageTask/Tasks';
import TaskImport from 'components/ManageTask/TaskImport';
import { useAuth } from 'context/auth-context';
import { useRoom } from 'hooks/room';

const Room: React.FC = () => {
  const btnRef = useRef();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vote, setVote] = useState<number | undefined>();

  const { room } = useRoom(id);
  const { users: onlineUsers = [] } = useSocket(room);

  return (
    <Container maxW='container.xl'>
      <Header size='container.xl' />
      <Flex mt='3' pt='8'>
        <Flex w={300} textOverflow='ellipsis' flexDir='column' alignItems='start'>
          {user?._id === room?.owner._id ? (
            <VStack w='full'>
              <Button colorScheme='messenger' w='full'>
                Start voting
              </Button>
              <Button w='full' ref={btnRef as any} onClick={onOpen}>
                Manage Tasks
              </Button>
            </VStack>
          ) : null}
          <Box fontSize='2xl' width='full' my='2' pb='2'>
            Attendees
          </Box>
          <AttendeeList onlineUsers={onlineUsers} attendees={room?.players} />
        </Flex>
        <VotePanel vote={vote} onVote={setVote} />
      </Flex>
      <ManageTaskDrawer isOpen={isOpen} onClose={onClose}>
        <TaskImport />
        <AddTaskForm roomId={id} />
        <Tasks roomId={id} />
      </ManageTaskDrawer>
      <CurrentTask isRoomOwner={room?.owner._id === user?._id} />
    </Container>
  );
};

export default Room;
