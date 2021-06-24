import React, { useState } from 'react';
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
  Textarea,
  FormLabel,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { addTask } from '../../services/room';

interface NewTaskProps extends Omit<ModalProps, 'children'> {
  onFinish: (tasks: Task[]) => void;
  roomId: string;
}

const NewTask: React.FC<NewTaskProps> = ({ onFinish, roomId, ...props }) => {
  const [name, setName] = useState<string>('');

  const handleNew = async () => {
    if (name && roomId) {
      const { data } = await addTask(roomId, name);
      setName('');
      onFinish(data);
    }
  };

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id='register_password' isRequired isDisabled={false}>
            <FormLabel>Task Details</FormLabel>
            <Textarea
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
            Add Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTask;
