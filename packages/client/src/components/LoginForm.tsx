import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import AlertMessage from './shared/Alert';

import FormWrapper from './shared/FormWrapper';

interface LoginFormProps {
  onSubmit: ({ username, password }: { username: string; password: string }) => void;
  onRegisterButtonClick: (page: string) => void;
  isLoading: boolean;
  error?: string | null;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  pwd: HTMLInputElement;
}
interface LoginFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onRegisterButtonClick,
  onSubmit,
  isLoading,
  error,
}) => {
  const handleLogin = async (event: React.FormEvent<LoginFormElements>) => {
    event.preventDefault();
    const { pwd, name } = event.currentTarget.elements;

    if (name.value.length > 0 && pwd.value.length > 0) {
      onSubmit({ username: name.value, password: pwd.value });
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleLogin}>
        <Box mb='10'>
          <Text textAlign='center' fontSize='3xl'>
            Login
          </Text>
          <Text textAlign='center' fontSize='small'>
            Please sign-in
          </Text>
        </Box>
        {error ? <AlertMessage title={String(error)} /> : null}
        <FormControl id='login_username' isRequired isDisabled={isLoading}>
          <FormLabel>Username</FormLabel>
          <Input type='text' name='name' placeholder='Enter your Username' />
        </FormControl>
        <FormControl id='login_password' isRequired mt='5' isDisabled={isLoading}>
          <FormLabel>Password</FormLabel>
          <Input name='pwd' type='password' placeholder='Enter your password' />
        </FormControl>
        <Button
          isFullWidth
          colorScheme='blue'
          mt='5'
          isDisabled={isLoading}
          isLoading={isLoading}
          type='submit'
        >
          Login
        </Button>
        <Flex mt='6' justifyContent='center'>
          <Button
            onClick={() => onRegisterButtonClick('register')}
            colorScheme='blue'
            variant='link'
            type='button'
          >
            You don&apos;t have an account yet? Click here to register
          </Button>
        </Flex>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
