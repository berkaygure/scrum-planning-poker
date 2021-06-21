import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import OnlyGuestRoute from "./components/OnlyGuestRoot";
import PrivateRoute from "./components/PrivateRoute";
// import socketIOClient, { Socket } from 'socket.io-client';
// import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export const App = () => {
  // const [room, setRoom] = React.useState('');
  // const [username, setUsername] = React.useState('');
  // let ws = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  // React.useEffect(() => {
  //   ws.current = socketIOClient("http://localhost:8080");
  // }, [])

  // React.useEffect(() => {
  //     if(ws.current) {
  //       ws.current.on("initRoom", function(data) {
  //         console.log(data)
  //       });
  //     }
  // },[ws]);

  // const handleCreateRoom = () => {
  //   ws.current?.emit('joinRoom', {room, username});
  // }

  return (
    <ChakraProvider theme={theme}>
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Router>
        <Switch>
          <PrivateRoute path="/dashboard" exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/channel/:id" exact>
            <Room />
          </PrivateRoute>
          <OnlyGuestRoute path="/" exact redirectTo="/dashboard">
            <Login />
          </OnlyGuestRoute>
          <Route>
            Not Found
          </Route>
        </Switch>
      </Router>
      {/* <Input value={username} onChange={e => setUsername(e.target.value)}/>
      <Input value={room} onChange={e => setRoom(e.target.value)}/>
      <Button onClick={handleCreateRoom}>Create a room</Button> */}
    </ChakraProvider>
  );
};
