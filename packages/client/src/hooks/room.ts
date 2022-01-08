/* eslint-disable @typescript-eslint/no-explicit-any */
import { useClient } from 'context/auth-context';
import { useMutation, useQuery, useQueryClient } from 'react-query';

function useRooms(q?: string, onlyJoined?: boolean) {
  const client = useClient();
  const roomQuery = useQuery(['rooms', q, onlyJoined], () =>
    client<Room[]>(`/api/rooms`, { params: { onlyJoined, q } }),
  );
  return {
    rooms: roomQuery.data || [],
    isLoading: roomQuery.isLoading,
    error: roomQuery.error,
  };
}

function useCreateRoom(options?: any) {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    ({ name }: { name: string }) => client('/api/rooms', { method: 'POST', data: { name } }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('rooms');
      },
      ...options,
    },
  );
}

function useRemoveRoom(options?: any) {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(({ id }: { id: string }) => client('/api/rooms/' + id, { method: 'DELETE' }), {
    onSettled: () => {
      queryClient.invalidateQueries('rooms');
    },
    ...options,
  });
}

function useJoinOrLeaveRoom(type: 'join' | 'leave', options?: any) {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: string }) =>
      client(`/api/rooms/${id}/${type}/`, { method: type === 'join' ? 'POST' : 'DELETE' }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('rooms');
      },
      ...options,
    },
  );
}

function useRoom(id: string, options?: any) {
  const client = useClient();
  const roomQuery = useQuery(['rooms', id], () => client<Room>(`/api/rooms/${id}`), {
    ...options,
  });
  return {
    ...roomQuery,
    room: roomQuery.data,
    isLoading: roomQuery.isLoading,
    error: roomQuery.error,
  };
}

export { useRooms, useCreateRoom, useRemoveRoom, useJoinOrLeaveRoom, useRoom };
