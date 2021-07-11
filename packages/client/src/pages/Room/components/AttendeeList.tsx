import { useMemo } from 'react';
import { Box, Flex, Avatar, AvatarBadge, Text } from '@chakra-ui/react';

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
    () => (userId: string) => onlineUsers.findIndex((x) => x.userId === userId) > -1,
    [onlineUsers],
  );

  return (
    <Box mt='5'>
      {attendees.map((e) => (
        <Flex key={e._id} mb='1' alignItems='center' px='1' pb='3' pt='2'>
          <Avatar size='sm' name={e.username} mr='5'>
            <AvatarBadge boxSize='1.25em' bg={isOnline(e._id) ? 'green.500' : 'gray.300'} />
          </Avatar>
          <Text fontSize='lg'>{e.username}</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default AttendeeList;
