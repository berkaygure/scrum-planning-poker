import {
  Box,
  Divider,
  Heading,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  HStack,
  Button,
  Th,
} from '@chakra-ui/react';
import { useTasks } from 'hooks/tasks';

interface TasksProps {
  roomId: string;
}

const Tasks: React.FC<TasksProps> = ({ roomId }) => {
  const { tasks } = useTasks(roomId);
  return (
    <Box mt='5'>
      <Heading size='md' mb='5'>
        Tasks
      </Heading>
      <Divider />
      <Table size='sm' mt='3'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th w={100} textAlign='center'>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks?.map((task) => (
            <Tr key={task._id}>
              <Td>{task.name}</Td>
              <Td>
                <HStack>
                  <Button size='sm'>Up</Button>
                  <Button size='sm'>Down</Button>
                  <Button size='sm'>Delete</Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Tasks;
