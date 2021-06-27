declare interface User {
  name: string;
  id: string;
  _id: string;
  token: string;
}

declare interface Task {
  _id: string;
  name: string;
}
declare interface Room {
  _id: string;
  name: string;
  users: Omit<User, 'token'>[];
  owner: User;
  createdAt: string;
  tasks: Task[];
}

declare interface ValidationError {
  field: string;
  message: string;
}

declare module 'react-document-title' {
  import * as React from 'react';

  interface DocumentTitleProps {
    title: string;
  }

  class DocumentTitle extends React.Component<DocumentTitleProps, any> {}

  export = DocumentTitle;
}

declare module '@scrum-game/common' {
  export { BASE, URL_REGISTER, URL_LOGIN, URL_GET_USER_BY_ID, URL_ROOMS };
}
