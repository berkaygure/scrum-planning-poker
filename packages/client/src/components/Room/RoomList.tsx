import { Flex } from '@chakra-ui/react';
import Confirm from 'components/shared/Confirm';
import { useAuth } from 'context/auth-context';
import { useRemoveRoom } from 'hooks/room';
import { useState } from 'react';
import ListItem from './LisItem';
import Skeleton from './Skeleton';

interface RoomListProps {
  rooms: Room[];
  isLoading?: boolean;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, isLoading }) => {
  const { user } = useAuth();
  const { mutateAsync, isLoading: deleteLoading } = useRemoveRoom();
  const [room, setRoom] = useState<Room | null>(null);

  const handleRemove = async () => {
    if (room) {
      await mutateAsync({ id: room.id });
      setRoom(null);
    }
  };

  if (isLoading) {
    return (
      <Flex flex='1' w='full' direction='column' my='5'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Flex>
    );
  }

  return (
    <Flex flex='1' w='full' direction='column' my='5'>
      {rooms.map((room) => (
        <ListItem
          key={room.id}
          room={room}
          userId={user?._id}
          onRemove={setRoom}
          isLoading={isLoading}
        />
      ))}
      <Confirm
        onOk={handleRemove}
        title='Are you sure to delete?'
        isOpen={Boolean(room)}
        isLoading={deleteLoading}
        onClose={() => setRoom(null)}
        message='You will be lost all content of your channel'
      />
    </Flex>
  );
};

export default RoomList;
