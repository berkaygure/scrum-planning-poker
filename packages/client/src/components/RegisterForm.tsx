import React from 'react';

import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

import FormWrapper from './shared/FormWrapper';
import AlertMessage from './shared/Alert';

interface RegisterFormProps {
  onSubmit: (credentials: { username: string; password: string }) => void;
  onLoginButtonClick: (page: string) => void;
  isLoading: boolean;
  error?: string | null;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  pwd: HTMLInputElement;
}
interface RegisterFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onLoginButtonClick,
  onSubmit,
  isLoading = false,
  error,
}) => {
  const handleRegister = async (event: React.FormEvent<RegisterFormElements>) => {
    event.preventDefault();
    const { pwd, name } = event.currentTarget.elements;

    if (name.value.length > 0 && pwd.value.length > 0) {
      onSubmit({ username: name.value, password: pwd.value });
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleRegister}>
        <Box mb='10'>
          <Text textAlign='center' fontSize='3xl'>
            Register
          </Text>
          <Text textAlign='center' fontSize='small'>
            Please fill in all fields.
          </Text>
        </Box>
        {error ? <AlertMessage title={String(error)} /> : null}
        <FormControl id='register_username' isRequired isDisabled={isLoading}>
          <FormLabel>Username</FormLabel>
          <Input name='name' type='text' placeholder='Enter your Username' />
        </FormControl>
        <FormControl id='register_password' isRequired mt='5' isDisabled={isLoading}>
          <FormLabel>Password</FormLabel>
          <Input name='pwd' type='password' placeholder='Please choose a password' />
        </FormControl>
        <FormControl id='register_repassword' isRequired mt='5' isDisabled={isLoading}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type='password' placeholder='Confirm your password' />
        </FormControl>
        <Button
          isFullWidth
          colorScheme='blue'
          mt='5'
          type='submit'
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          Register
        </Button>
        <Flex mt='6' justifyContent='center'>
          <Button
            type='button'
            onClick={() => onLoginButtonClick('login')}
            colorScheme='blue'
            variant='link'
          >
            Do you have an account? Click to Login
          </Button>
        </Flex>
      </form>
    </FormWrapper>
  );
};

export default RegisterForm;
