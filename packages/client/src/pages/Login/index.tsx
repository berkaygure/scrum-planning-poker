import React, { useState } from 'react';
import { Flex, Center } from '@chakra-ui/react';
import { useTransition, animated, config } from 'react-spring';
import { useHistory, useLocation } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

// import { ColorModeSwitcher } from '../../components/ColorModeSwitcher';
import useLocalStorage from '../../hooks/useLocalStorage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Login = () => {
  const loc = useLocation();
  const { push } = useHistory();
  const { setUser } = useLocalStorage();
  const [animate, setAnimate] = useState(true);

  const transitions = useTransition(animate, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: animate,
    delay: 50,
    config: config.gentle,
  });

  const handleFormCompleted = (user: User) => {
    setUser(user);
    setTimeout(() => {
      push('/dashboard');
    }, 100);
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
    <DocumentTitle title={`${animate ? 'Register' : 'Login'} - ${process.env.REACT_APP_APP_NAME}`}>
      <Flex minH='100vh' p={3} flex='1' justifyContent='center'>
        {/* <ColorModeSwitcher right='5' position='fixed' top='3' /> */}
        <Center>
          {transitions(({ opacity }, item) =>
            item ? (
              <animated.div
                style={{
                  position: 'absolute',
                  opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
                }}
              >
                <RegisterForm onRegisterSuccess={handleFormCompleted} altBtnClick={changePage} />
              </animated.div>
            ) : (
              <animated.div
                style={{
                  position: 'absolute',
                  opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
                }}
              >
                <LoginForm onLoginSuccess={handleFormCompleted} altBtnClick={changePage} />
              </animated.div>
            ),
          )}
        </Center>
      </Flex>
    </DocumentTitle>
  );
};

export default Login;
