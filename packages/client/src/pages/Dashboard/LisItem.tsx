import React, { useMemo } from 'react';
import { Flex, Heading, Button, Text, TextProps, Icon } from '@chakra-ui/react';
import {
  IoIosCalendar,
  IoIosPeople,
  IoIosPerson,
  IoIosList,
  IoIosTrash,
  IoIosLogOut,
  IoIosLogIn,
} from 'react-icons/io';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceToNow } from 'date-fns';

interface IconTextProps {
  icon: any;
  text: string;
  textStyle?: TextProps;
}
const IconText: React.FC<IconTextProps> = ({ icon, text, textStyle }) => {
  return (
    <Flex alignItems='center' mr='1' color='gray.400'>
      <Icon fontSize='sm' mr='1' as={icon} />{' '}
      <Text fontSize='sm' {...textStyle}>
        {text}
      </Text>
    </Flex>
  );
};

interface ListItemProps {
  room: Room;
  currentUser: User | null;
  onLeave: (room: Room) => void;
  onRemove: (room: Room) => void;
  onJoin: (room: Room) => void;
}

const ListItem: React.FC<ListItemProps> = ({ room, currentUser, onRemove, onLeave, onJoin }) => {
  const isJoined = useMemo(() => {
    return room.users.findIndex((x) => x._id === currentUser?.id) > -1;
  }, [currentUser, room]);

  const isOwner = useMemo(() => {
    return room.owner._id === currentUser?.id;
  }, [currentUser, room]);
  return (
    <Flex
      key={room._id}
      borderBottom='1px'
      pb='5'
      mb='5'
      pr='5'
      borderBottomColor='gray.600'
      align='center'
      justifyContent='space-between'
    >
      <Flex flexDirection='column'>
        <Heading
          as={Link}
          p='0'
          to={`/channel/${room._id}`}
          _hover={{ color: 'blue.500', textDecoration: 'underline' }}
        >
          #{room.name}
        </Heading>
        <Flex mt='3'>
          <IconText icon={IoIosList} text={`${room.tasks.length} tasks`} />
          ⋅
          <IconText
            icon={IoIosCalendar}
            text={formatDistanceToNow(parseISO(room.createdAt), {
              addSuffix: true,
            })}
          />
          ⋅
          <IconText
            icon={IoIosPerson}
            text={room.owner.name}
            textStyle={{ textDecoration: 'underline' }}
          />
          ⋅
          <IconText icon={IoIosPeople} text={room.users.length.toString()} />
        </Flex>
      </Flex>
      {isOwner ? (
        <Button
          rounded='md'
          onClick={() => onRemove(room)}
          leftIcon={<IoIosTrash />}
          colorScheme='red'
        >
          Remove
        </Button>
      ) : isJoined ? (
        <Button rounded='md' onClick={() => onLeave(room)} leftIcon={<IoIosLogOut />}>
          Leave
        </Button>
      ) : (
        <Button
          rounded='md'
          onClick={() => onJoin(room)}
          leftIcon={<IoIosLogIn />}
          colorScheme='orange'
        >
          Join
        </Button>
      )}
    </Flex>
  );
};

export default ListItem;
