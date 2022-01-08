import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Input, Button, Checkbox, useDisclosure } from '@chakra-ui/react';

import Header from 'components/shared/Header';
import { useDebounce } from 'hooks/useDebounce';
import { useCreateRoom, useRooms } from 'hooks/room';
import { RoomList, RoomModal } from 'components/Room';

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onlyMyChannel, setOnlyMyChannel] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 500);

  const { isLoading, rooms } = useRooms(debouncedQuery, onlyMyChannel);
  const { isLoading: createLoading, mutateAsync } = useCreateRoom({
    onSuccess: () => onClose(),
  });

  return (
    <Box>
      <Header />
      <Box mx='auto' w={['100%', '100%', 800, 800]} mt='4' px={[4, 4, 'auto', 'auto']}>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading borderBottom='1px' pb='5' mb='5' borderBottomColor='gray.500'>
            Channels to Join
          </Heading>
          <Button onClick={onOpen} leftIcon={<AddIcon />}>
            New Channel
          </Button>
        </Flex>
        <Input
          value={query}
          placeholder='Search in channels...'
          onChange={(e) => setQuery(e.target.value)}
        />
        <Checkbox
          mt='5'
          checked={onlyMyChannel}
          onChange={(e) => setOnlyMyChannel(e.target.checked)}
        >
          Show only joined channels
        </Checkbox>
        <RoomList rooms={rooms} isLoading={isLoading} />
        <RoomModal
          loading={createLoading}
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={mutateAsync}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
