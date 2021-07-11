import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalProps,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { createRoom } from '../../services/room';

interface NewRoomProps extends Omit<ModalProps, 'children'> {
  onFinish: (room: Room) => void;
}

const NewChannel: React.FC<NewRoomProps> = ({ onFinish, ...props }) => {
  const [name, setName] = useState<string>('');

  const handleNew = async () => {
    if (name) {
      const { data } = await createRoom(name);
      setName('');
      onFinish(data);
    }
  };

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id='register_password' isRequired isDisabled={false}>
            <FormLabel>Channel Name</FormLabel>
            <Input
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='What is you channel name?'
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button leftIcon={<PlusSquareIcon />} colorScheme='blue' onClick={handleNew}>
            Create Channel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewChannel;
