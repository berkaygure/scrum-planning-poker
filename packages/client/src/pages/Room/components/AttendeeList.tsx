import React, { useMemo } from 'react';
import { Box, Flex, Avatar, AvatarBadge, Text, Heading } from '@chakra-ui/react';

export interface OnlineUser {
  room: string;
  userId: string;
  id: string;
}

interface AttendeeListProps {
  attendees: Room['users'];
  onlineUsers: OnlineUser[];
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees, onlineUsers }) => {
  const isOnline = useMemo(
    () => (userId: string) => {
      return onlineUsers.findIndex((x) => x.userId === userId) > -1;
    },
    [onlineUsers],
  );

  return (
    <Box>
      <Box py='3'>
        <Heading borderBottom='1px' fontSize='2xl' pb='3' borderColor='gray.600'>
          Attendees
        </Heading>
      </Box>
      <Box>
        {attendees.map((e) => (
          <Flex key={e._id} mb='3' alignItems='center'>
            <Avatar name={e.name} mr='5'>
              <AvatarBadge boxSize='1.25em' bg={isOnline(e._id) ? 'green.500' : 'gray.300'} />
            </Avatar>
            <Text fontSize='lg'>{e.name}</Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default AttendeeList;
