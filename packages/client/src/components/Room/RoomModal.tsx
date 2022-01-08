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

interface NewRoomProps extends Omit<ModalProps, 'children'> {
  onSubmit: ({ name }: { name: string }) => void;
  loading?: boolean;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}
interface NewChannelFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const RoomModal: React.FC<NewRoomProps> = ({ onSubmit, loading, ...props }) => {
  const handleNew = async (e: React.FormEvent<NewChannelFormElements>) => {
    e.preventDefault();
    const { name } = e.currentTarget.elements;

    if (name.value) {
      onSubmit({ name: name.value });
    }
  };

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleNew}>
          <ModalHeader>New Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id='register_password' isRequired isDisabled={false}>
              <FormLabel>Channel Name</FormLabel>
              <Input
                disabled={loading}
                autoFocus
                type='text'
                name='name'
                placeholder='What is you channel name?'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} leftIcon={<PlusSquareIcon />} colorScheme='blue'>
              Create Channel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RoomModal;
