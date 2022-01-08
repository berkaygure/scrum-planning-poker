/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useToast } from '@chakra-ui/react';
import { useAuth } from 'context/auth-context';
import { useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';

interface SocketState {
  users: { id: string; userId: string }[];
}

enum ActionType {
  ONLINE_USERS = 'online_users',
}

type Action = {
  type: ActionType.ONLINE_USERS;
  payload: Required<SocketState['users']>;
};

function socketReducer(state: SocketState, action: Action): SocketState {
  switch (action.type) {
    case 'online_users':
      return {
        ...state,
        users: action.payload,
      };
    default:
      throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
  }
}

export function useSocket(room?: Room) {
  const toast = useToast();
  const { user } = useAuth();
  const [state, dispatch] = useReducer(socketReducer, {
    users: [],
  });

  useEffect(() => {
    if (!room) return;
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      socket.emit('join', { room: '61bcdd6eae6ea17a57bd27a3', userId: user?._id }, (error: any) => {
        if (error) {
          alert(error);
        }
      });
    });

    socket.on('onlineUsers', (arg: any) => {
      console.log(arg.users);

      if (!arg.users.some((x: any) => x.userId === room?.owner._id && !user?._id !== x.userId)) {
        toast({
          title: 'Admin left the room! 😱',
          status: 'error',
          duration: 9000,
          position: 'top',
          isClosable: false,
        });
      }
      dispatch({ type: ActionType.ONLINE_USERS, payload: arg.users });
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  return {
    users: state.users,
  };
}
