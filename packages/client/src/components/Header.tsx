import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { IoIosLogOut } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

// import { ColorModeSwitcher } from './ColorModeSwitcher';
import useLocalStorage from '../hooks/useLocalStorage';

const Header = () => {
  const { user, logoutUser } = useLocalStorage();
  const { push } = useHistory();

  return (
    <>
      {/* <ColorModeSwitcher right='5' position='fixed' top='3' /> */}
      <Flex
        py='2'
        mt='2'
        mx='auto'
        alignItems='center'
        px={[4, 4, 'auto', 'auto']}
        w={['100%', '100%', 800, 800]}
        justifyContent='space-between'
      >
        <Text color='gray.400'>
          Welcome,{' '}
          <Text as='span' fontWeight='bold'>
            {user?.username}
          </Text>
        </Text>
        <Button
          onClick={() => {
            logoutUser();
            push('/');
          }}
          leftIcon={<IoIosLogOut />}
          variant='ghost'
        >
          Logout
        </Button>
      </Flex>
    </>
  );
};

export default Header;
