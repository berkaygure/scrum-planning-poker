import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'context/auth-context';

const OnlyGuestRoute: React.FC<{
  children?: ReactNode;
  path: string;
  redirectTo: string;
  exact: boolean;
}> = (props) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    <Route path={props.path} exact={props.exact}>
      {props.children}
    </Route>
  ) : (
    <Redirect to={props.redirectTo} />
  );
};
export default OnlyGuestRoute;
