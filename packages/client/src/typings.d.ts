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
