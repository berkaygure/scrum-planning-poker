import { useMemo, useState } from 'react';
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
import { useJoinOrLeaveRoom } from 'hooks/room';

interface IconTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  userId?: string;
  isLoading?: boolean;
  onRemove: (room: Room) => void;
}

const ListItem: React.FC<ListItemProps> = ({ room, userId, onRemove, isLoading }) => {
  const [info, setInfo] = useState({
    userLength: room.players.length,
    isJoined: room.players.findIndex((x) => x._id === userId) > -1,
  });

  const isOwner = useMemo(() => room.owner._id === userId, [userId, room]);

  const { isLoading: roomIsLoading, mutate } = useJoinOrLeaveRoom(
    info.isJoined ? 'leave' : 'join',
    {
      onSuccess: () => {
        setInfo((_info) => ({ ..._info, isJoined: true, userLength: _info.userLength + 1 }));
      },
    },
  );

  return (
    <Flex
      pb='5'
      mb='5'
      pr='5'
      align='center'
      borderBottom='1px'
      borderBottomColor='gray.600'
      justifyContent='space-between'
    >
      <Flex flexDirection='column'>
        <Heading
          p='0'
          as={Link}
          to={`/room/${room.id}`}
          _hover={{ color: 'blue.500', textDecoration: 'underline' }}
        >
          #{room.name}
        </Heading>
        <Flex mt='3'>
          <IconText icon={IoIosList} text={`${room.tasks.length} tasks`} />⋅
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
          <IconText icon={IoIosPeople} text={info.userLength.toString()} />
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
      ) : info.isJoined ? (
        <Button
          rounded='md'
          onClick={() => mutate(room)}
          leftIcon={<IoIosLogOut />}
          isLoading={isLoading || roomIsLoading}
          isDisabled={isLoading || roomIsLoading}
        >
          Leave
        </Button>
      ) : (
        <Button
          rounded='md'
          colorScheme='orange'
          leftIcon={<IoIosLogIn />}
          isLoading={isLoading || roomIsLoading}
          isDisabled={isLoading || roomIsLoading}
          onClick={() => mutate(room)}
        >
          Join
        </Button>
      )}
    </Flex>
  );
};

export default ListItem;
