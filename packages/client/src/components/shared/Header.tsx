import { Flex, Text, Button, Container } from '@chakra-ui/react';
import { useAuth } from 'context/auth-context';
import { IoIosLogOut } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

const Header: React.FC<{ size?: 'container.md' | 'container.xl' }> = ({
  size = 'container.md',
}) => {
  const { push } = useHistory();
  const { user, logOut } = useAuth();

  return (
    <Container maxW={size}>
      <Flex py='2' mt='2' alignItems='center' justifyContent='space-between'>
        <Text color='gray.400'>
          Welcome,{' '}
          <Text as='span' fontWeight='bold'>
            {user?.username}
          </Text>
        </Text>
        <Button
          onClick={async () => {
            await logOut();
            push('/');
          }}
          leftIcon={<IoIosLogOut />}
          variant='ghost'
        >
          Logout
        </Button>
      </Flex>
    </Container>
  );
};

export default Header;
