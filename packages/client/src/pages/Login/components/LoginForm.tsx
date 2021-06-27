import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { login } from '../../../services/auth';
import FormWrapper from './FormWrapper';
import Alert from '../../../components/Alert';
import { parseValidationErrors } from '../../../utils';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
  altBtnClick: (page: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ altBtnClick, onLoginSuccess }) => {
  const [pwd, setPwd] = useState<string>('');
  const [errors, setErrors] = useState<ValidationError[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleLogin = async () => {
    if (name.length > 0 && pwd.length > 0) {
      setLoading(true);
      setErrors(undefined);
      try {
        const { data } = await login(name, pwd);
        onLoginSuccess(data);
      } catch (e) {
        setErrors(parseValidationErrors(e.response.data?.errors));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormWrapper>
      <Box mb='10'>
        <Text textAlign='center' fontSize='3xl'>
          Login
        </Text>
        <Text textAlign='center' fontSize='small'>
          Please sign-in
        </Text>
      </Box>
      {errors && errors.map((e) => <Alert key={e.field} title={e.message} mb='4' />)}
      <FormControl id='login_username' isRequired isDisabled={loading}>
        <FormLabel>Username</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value.toLowerCase().trim())}
          type='text'
          placeholder='Enter your Username'
        />
      </FormControl>
      <FormControl id='login_password' isRequired mt='5' isDisabled={loading}>
        <FormLabel>Password</FormLabel>
        <Input
          value={pwd}
          onChange={(e) => setPwd(e.target.value.toLowerCase().trim())}
          type='password'
          placeholder='Enter your password'
        />
      </FormControl>
      <Button
        isFullWidth
        colorScheme='blue'
        mt='5'
        onClick={handleLogin}
        isDisabled={loading}
        isLoading={loading}
      >
        Login
      </Button>
      <Flex mt='6' justifyContent='center'>
        <Button
          onClick={() => altBtnClick('register')}
          colorScheme='blue'
          variant='link'
          type='button'
        >
          You don't have an account yet? Click here to register
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default LoginForm;
