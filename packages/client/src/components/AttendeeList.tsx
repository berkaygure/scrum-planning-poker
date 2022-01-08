import {
  Avatar,
  AvatarBadge,
  Badge,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react';

export interface AttendeeListProps {
  attendees?: Room['players'];
  onlineUsers?: { userId: string; id: string }[];
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees, onlineUsers }) => {
  return (
    <VStack spacing='20px'>
      {attendees?.map((x) => (
        <HStack key={x._id} spacing='24px'>
          <Menu>
            <MenuButton>
              <Avatar name={x.username}>
                <AvatarBadge
                  boxSize='1em'
                  bg={onlineUsers?.some((u) => u.userId === x._id) ? 'green.500' : 'gray.500'}
                />
              </Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem>We are working on it</MenuItem>
              {/* <MenuItem>Open Closed Tab</MenuItem>
                    <MenuItem>Open File</MenuItem> */}
            </MenuList>
          </Menu>

          <Flex flexDir='column' alignItems='start'>
            <Heading size='sm' mb={2}>
              {x.username}
            </Heading>
            <Badge>Waiting for vote</Badge>
          </Flex>
        </HStack>
      ))}
    </VStack>
  );
};

export default AttendeeList;
