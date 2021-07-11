import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Button, Icon, Text, Stack } from '@chakra-ui/react';
import { GiPokerHand } from 'react-icons/gi';
import { IoIosPeople, IoIosShare, IoIosAdd } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import { findRoom } from '../../services/room';
import AttendeeList from './components/AttendeeList';

const Room = () => {
  const [room, setRoom] = useState<Room>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      const { data } = await findRoom(id);
      setRoom(data);
    })();
  }, [id]);

  return (
    <Flex h='100vh' w={1200} mx='auto' justifyContent='space-between'>
      <Box flex={1.2} pos='relative'>
        <Heading fontSize='2xl' p='4' as='a' display='block' _hover={{ color: 'gray.500' }}>
          <Icon as={GiPokerHand} fontSize='5xl' />
          <Text as='span' ml='4'>
            ScrumPoker
          </Text>
        </Heading>

        <Box px='5' pos='absolute' bottom='5' w='full'>
          <Button w='full' size='sm' colorScheme='red'>
            Leave Room
          </Button>
        </Box>
      </Box>
      <Box flex={2.5} borderY='none' borderColor='gray.700' borderWidth='thin'>
        <Heading
          fontSize='2xl'
          p='4'
          borderBottom='solid'
          borderBottomColor='gray.700'
          borderBottomWidth='thin'
        >
          {room?.name}
        </Heading>
      </Box>
      <Box flex={1} pl='5' pt='5'>
        <Heading fontSize='xl' as='a' display='block' _hover={{ color: 'gray.500' }}>
          <Icon as={IoIosPeople} fontSize='2xl' />
          <Text as='span' ml='2'>
            Attendees
          </Text>
        </Heading>
        <AttendeeList
          attendees={room?.users || []}
          onlineUsers={[{ id: '1', room: '1', userId: '1' }]}
        />
        <Button mt='5' leftIcon={<IoIosShare />} size='sm' w='full' variant='outline'>
          Invite people
        </Button>
      </Box>
    </Flex>
  );
};

export default Room;
