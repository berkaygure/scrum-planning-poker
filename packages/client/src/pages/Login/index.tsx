import React, { useState } from "react";
import { Flex, Center } from "@chakra-ui/react";
import { useTransition, animated, config } from "react-spring";
import { useHistory, useLocation } from "react-router-dom";

import { ColorModeSwitcher } from "../../components/ColorModeSwitcher";
import useLocalStorage from "../../hooks/useLocalStorage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const Login = () => {
  const { setUser } = useLocalStorage();
  const loc = useLocation();
  const [toggle, set] = useState(true);
  const { push } = useHistory();

  const transitions = useTransition(toggle, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 50,
    config: config.gentle,
  });

  const handleFormCompleted = (user: User) => {
    setUser(user);
    setTimeout(() => {
      push("/dashboard");
    }, 100);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(loc.search);    
    set(params.get("p") === "login");
  }, [loc]);

  const changePage = (page: string) =>
    push({
      search: `p=${page}`,
    });

  return (
    <Flex minH="100vh" p={3} flex="1" justifyContent="center">
      <ColorModeSwitcher right="5" position="fixed" top="3" />
      <Center>
        {transitions(({ opacity }, item) =>
          item ? (
            <animated.div
              style={{
                position: "absolute",
                opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
              }}
            >
              <LoginForm
                onLoginSuccess={handleFormCompleted}
                altBtnClick={changePage}
              />
            </animated.div>
          ) : (
            <animated.div
              style={{
                position: "absolute",
                opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
              }}
            >
              <RegisterForm
                onRegisterSuccess={handleFormCompleted}
                altBtnClick={changePage}
              />
            </animated.div>
          )
        )}
      </Center>
    </Flex>
  );
};

export default Login;
