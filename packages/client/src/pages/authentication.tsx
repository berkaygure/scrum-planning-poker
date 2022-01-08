import React, { useState } from 'react';
import { Flex, Center } from '@chakra-ui/react';
import { useTransition, animated, config } from 'react-spring';
import { useHistory, useLocation } from 'react-router-dom';

import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import { useAsync } from 'hooks/useAsync';
import { useAuth } from 'context/auth-context';

const Authentication: React.FC = () => {
  const { logIn, register } = useAuth();
  const loc = useLocation();
  const { push } = useHistory();
  const [animate, setAnimate] = useState(true);
  const { run, isLoading, error } = useAsync();

  const transitions = useTransition(animate, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: animate,
    delay: 50,
    config: config.gentle,
  });

  const handleLoginForm = ({ username, password }: { username: string; password: string }) => {
    run(logIn(username, password));
  };

  const handleRegisterForm = ({ username, password }: { username: string; password: string }) => {
    run(register(username, password));
  };

  React.useEffect(() => {
    const params = new URLSearchParams(loc.search);
    setAnimate(params.get('p') === 'register');
  }, [loc]);

  const changePage = (page: string) =>
    push({
      search: `p=${page}`,
    });

  return (
    <Flex minH='100vh' p={3} flex='1' justifyContent='center'>
      <Center>
        {transitions(({ opacity }, item) =>
          item ? (
            <animated.div
              style={{
                position: 'absolute',
                opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
              }}
            >
              <RegisterForm
                onSubmit={handleRegisterForm}
                onLoginButtonClick={changePage}
                isLoading={isLoading}
                error={error?.errors[0].title}
              />
            </animated.div>
          ) : (
            <animated.div
              style={{
                position: 'absolute',
                opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
              }}
            >
              <LoginForm
                isLoading={isLoading}
                onSubmit={handleLoginForm}
                error={error?.errors[0].title}
                onRegisterButtonClick={changePage}
              />
            </animated.div>
          ),
        )}
      </Center>
    </Flex>
  );
};

export default Authentication;
