import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

const Confirm: React.FC<ConfirmProps> = ({ isOpen, onClose, title, message, onOk, isLoading }) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button disabled={isLoading} ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              colorScheme='red'
              onClick={onOk}
              ml={3}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default Confirm;
