import * as React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Room from './pages/Room';
import OnlyGuestRoute from './components/OnlyGuestRoot';
import PrivateRoute from './components/PrivateRoute';
import theme from './theme';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Switch>
          <PrivateRoute path='/dashboard' exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/channel/:id' exact>
            <Room />
          </PrivateRoute>
          <OnlyGuestRoute path='/' exact redirectTo='/dashboard'>
            <Login />
          </OnlyGuestRoute>
          <Route>Not Found</Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};
