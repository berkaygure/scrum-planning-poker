import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'context/auth-context';

const PrivateRoute: React.FC<{
  children?: ReactNode;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={props.path} exact={props.exact}>
      {props.children}
    </Route>
  ) : (
    <Redirect to='/' />
  );
};
export default PrivateRoute;
