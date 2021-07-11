import { useEffect, useState, KeyboardEvent } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';

import Alert from '../../../components/Alert';
import FormWrapper from './FormWrapper';
import { register } from '../../../services/auth';
import { parseValidationErrors } from '../../../utils';

interface RegisterFormProps {
  onRegisterSuccess: (user: User) => void;
  altBtnClick: (page: string) => void;
}

type ErrorState = {
  passwordMatch?: string;
  apiError?: ValidationError[];
};

const RegisterForm: React.FC<RegisterFormProps> = ({ altBtnClick, onRegisterSuccess }) => {
  const [error, setError] = useState<ErrorState>();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [rePwd, setRePwd] = useState<string>('');

  const handleRegister = async () => {
    if (!error?.passwordMatch && name.length > 0 && pwd.length > 0) {
      setLoading(true);
      setError(undefined);
      try {
        const { data } = await register(name, pwd);
        onRegisterSuccess(data);
      } catch (e) {
        setError((err) => ({ ...err, apiError: parseValidationErrors(e.response.data?.errors) }));
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (rePwd.length > 0 && rePwd !== pwd) {
      setError((error) => ({
        ...error,
        passwordMatch: 'Your passwords does not match',
      }));
    } else {
      setError((error) => ({
        apiError: error?.apiError,
      }));
    }
  }, [pwd, rePwd]);

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <FormWrapper>
      <Box mb='10'>
        <Text textAlign='center' fontSize='3xl'>
          Register
        </Text>
        <Text textAlign='center' fontSize='small'>
          Please fill in all fields.
        </Text>
      </Box>
      {error?.apiError &&
        error?.apiError.map((e) => <Alert key={e.field} title={e.message} mb='4' />)}
      <FormControl id='register_username' isRequired isDisabled={loading}>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          value={name}
          onKeyPress={handleEnterKey}
          placeholder='Enter your Username'
          onChange={(e) => setName(e.target.value.toLowerCase().trim())}
        />
      </FormControl>
      <FormControl id='register_password' isRequired mt='5' isDisabled={loading}>
        <FormLabel>Password</FormLabel>
        <Input
          value={pwd}
          type='password'
          onKeyPress={handleEnterKey}
          placeholder='Please choose a password'
          onChange={(e) => setPwd(e.target.value.toLowerCase().trim())}
        />
      </FormControl>
      <FormControl
        id='register_repassword'
        isRequired
        mt='5'
        isInvalid={Boolean(error?.passwordMatch)}
        isDisabled={loading}
      >
        <FormLabel>Confirm Password</FormLabel>
        <Input
          value={rePwd}
          onChange={(e) => setRePwd(e.target.value.toLowerCase().trim())}
          type='password'
          placeholder='Confirm your password'
        />
        <FormErrorMessage>{error?.passwordMatch}</FormErrorMessage>
      </FormControl>
      <Button
        isFullWidth
        colorScheme='blue'
        mt='5'
        onClick={handleRegister}
        isDisabled={loading}
        isLoading={loading}
      >
        Register
      </Button>
      <Flex mt='6' justifyContent='center'>
        <Button
          type='button'
          onClick={() => altBtnClick('login')}
          colorScheme='blue'
          variant='link'
        >
          Do you have an account? Click to Login
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default RegisterForm;
