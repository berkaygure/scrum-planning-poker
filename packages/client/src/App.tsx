import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from 'theme';
import Room from 'pages/room';
import Dashboard from 'pages/dashboard';
import AuthProvider from 'context/auth-context';
import Authentication from 'pages/authentication';
import PrivateRoute from 'components/shared/PrivateRoute';
import OnlyGuestRoute from 'components/shared/OnlyGuestRoot';

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute path='/dashboard' exact>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path='/room/:id' exact={false}>
              <Room />
            </PrivateRoute>
            <OnlyGuestRoute path='/' exact redirectTo='/dashboard'>
              <Authentication />
            </OnlyGuestRoute>
            <Route>Not Found</Route>
          </Switch>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
