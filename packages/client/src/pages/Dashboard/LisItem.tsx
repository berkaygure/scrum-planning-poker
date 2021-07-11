import { useMemo } from 'react';
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
const IconText: React.FC<IconTextProps> = ({ icon, text, textStyle }) => (
  <Flex alignItems='center' mr='1' color='gray.400'>
    <Icon fontSize='sm' mr='1' as={icon} />{' '}
    <Text fontSize='sm' {...textStyle}>
      {text}
    </Text>
  </Flex>
);

interface ListItemProps {
  room: Room;
  currentUser: User | null;
  onLeave: (room: Room) => void;
  onRemove: (room: Room) => void;
  onJoin: (room: Room) => void;
}

const ListItem: React.FC<ListItemProps> = ({ room, currentUser, onRemove, onLeave, onJoin }) => {
  const hasJoined = useMemo(
    () => room.users.findIndex((x) => x._id === currentUser?._id) > -1,
    [currentUser, room],
  );

  const isOwner = useMemo(() => room.owner._id === currentUser?._id, [currentUser, room]);

  return (
    <Flex
      pb='5'
      mb='5'
      pr='5'
      align='center'
      key={room._id}
      borderBottom='1px'
      borderBottomColor='gray.600'
      justifyContent='space-between'
    >
      <Flex flexDirection='column'>
        <Heading
          p='0'
          as={Link}
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
            text={room.owner.username}
            textStyle={{ textDecoration: 'underline' }}
          />
          ⋅
          <IconText icon={IoIosPeople} text={room.users.length.toString()} />
        </Flex>
      </Flex>
      {isOwner ? (
        <Button
          rounded='md'
          colorScheme='red'
          leftIcon={<IoIosTrash />}
          onClick={() => onRemove(room)}
        >
          Remove
        </Button>
      ) : hasJoined ? (
        <Button rounded='md' onClick={() => onLeave(room)} leftIcon={<IoIosLogOut />}>
          Leave
        </Button>
      ) : (
        <Button
          rounded='md'
          colorScheme='orange'
          leftIcon={<IoIosLogIn />}
          onClick={() => onJoin(room)}
        >
          Join
        </Button>
      )}
    </Flex>
  );
};

export default ListItem;
