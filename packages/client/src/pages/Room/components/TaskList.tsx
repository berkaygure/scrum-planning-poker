import React from 'react';
import { Flex, Box, Text, IconButton, Stack, Heading } from '@chakra-ui/react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { BiImport } from 'react-icons/bi';

interface TaskListProps {
  onOpen: () => void;
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ onOpen, tasks }) => {
  return (
    <Box py='3'>
      <Flex
        borderBottom='1px'
        pb='3'
        justifyContent='space-between'
        alignItems='center'
        borderColor='gray.600'
      >
        <Heading fontSize='2xl'>Tasks</Heading>
        <Stack direction='row'>
          <IconButton
            onClick={onOpen}
            rounded='md'
            aria-label='Add Task'
            icon={<IoIosAddCircleOutline />}
          />
          <IconButton rounded='md' aria-label='Add Task' icon={<BiImport />} />
        </Stack>
      </Flex>
      {tasks.map((e) => (
        <Flex key={e._id} mb='3' alignItems='center'>
          <Text fontSize='lg'>{e.name}</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default TaskList;
