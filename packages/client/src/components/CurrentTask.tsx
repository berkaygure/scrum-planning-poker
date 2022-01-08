import { Box, Container, Flex, Text } from '@chakra-ui/react';

const CurrentTask: React.FC<{ isRoomOwner?: boolean }> = ({ isRoomOwner = false }) => {
  return (
    <Box pos='fixed' bottom={0} left={0} right={0} height={50} bg='blue.400'>
      <Container maxW='container.xl'>
        <Flex justifyContent='center' height={50} alignItems='center'>
          <Text fontSize='xl' textAlign='center'>
            {isRoomOwner
              ? ' Waiting for admin to start the voting! Wait, you are the admin! 😆'
              : 'Current task will be show here when admin starts the voting!'}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default CurrentTask;
