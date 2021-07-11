import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const OnlyGuestRoute: React.FC<{
  children?: ReactNode;
  path: string;
  redirectTo: string;
  exact: boolean;
}> = (props) => {
  const { user } = useLocalStorage();

  return !user ? (
    <Route path={props.path} exact={props.exact}>
      {props.children}
    </Route>
  ) : (
    <Redirect to={props.redirectTo} />
  );
};
export default OnlyGuestRoute;
