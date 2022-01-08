import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useCreateTask } from 'hooks/tasks';

interface AddTaskFromProps {
  roomId: string;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}
interface AddTaskFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const AddTaskForm: React.FC<AddTaskFromProps> = ({ roomId }) => {
  const { isLoading, mutate } = useCreateTask(roomId);

  const onSubmit = async (event: React.FormEvent<AddTaskFormElements>) => {
    event.preventDefault();
    const { name } = event.currentTarget.elements;

    if (name.value.length > 2) {
      mutate({
        name: name.value,
      });
    }
  };

  return (
    <Box as='form' my={4} onSubmit={onSubmit as any}>
      <Flex gridGap='4' mb='4'>
        <Input name='name' isDisabled={isLoading} flex='1' placeholder='Or add manually' />{' '}
        <Button isLoading={isLoading} disabled={isLoading} type='submit'>
          Add
        </Button>
      </Flex>
    </Box>
  );
};
export default AddTaskForm;
