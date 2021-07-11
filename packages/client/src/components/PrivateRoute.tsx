import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const PrivateRoute: React.FC<{
  children?: ReactNode;
  path: string;
  exact: boolean;
}> = (props) => {
  const { user } = useLocalStorage();

  return user ? (
    <Route path={props.path} exact={props.exact}>
      {props.children}
    </Route>
  ) : (
    <Redirect to='/' />
  );
};
export default PrivateRoute;
