import { URL_ROOMS } from '@scrum-game/common';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client } from 'utils/client';

function useTasks(roomId: string) {
  const { data, isLoading } = useQuery(
    ['room', roomId, 'tasks'],
    () => client<Task[]>(`${URL_ROOMS}/${roomId}/tasks`),
    {
      enabled: !!roomId,
    },
  );

  return {
    tasks: data,
    isLoading,
  };
}

function useCreateTask(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ name }: { name: string }) =>
      client(`${URL_ROOMS}/${roomId}/tasks/`, {
        method: 'POST',
        data: {
          name,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['room', roomId, 'tasks']);
      },
    },
  );
}

export { useTasks, useCreateTask };
