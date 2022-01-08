import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseJiraParams {
  url: string;
  username: string;
  password: string;
}

interface UseJiraResult {
  connect: (params: UseJiraParams) => Promise<boolean>;
  isConnected: boolean;
  search: () => Promise<any>;
}

function useJira(): UseJiraResult {
  const auth = useRef<{ JiraAuthorization: string; JiraUrl: string } | null>();

  const connect = useCallback(
    ({ url, username, password }: UseJiraParams) => {
      const header = `Basic ${btoa(`${username}:${password}`)}`;

      return axios
        .get('/api/jira', {
          method: 'GET',
          headers: {
            JiraAuthorization: header,
            JiraUrl: url,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            auth.current = {
              JiraAuthorization: header,
              JiraUrl: url,
            };
            return true;
          }
          return false;
        });
    },
    [auth],
  );

  const search = useCallback(() => {
    return axios
      .get('/api/jira/search', {
        method: 'GET',
        headers: auth.current,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return false;
      });
  }, [auth]);

  return {
    connect,
    isConnected: !!auth.current,
    search,
  };
}

export default useJira;
