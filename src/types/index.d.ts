export type UserType = {
  username: string;
  name: string;
  accessToken?: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type RegisterType = {
  username: string;
  name: string;
  password: string;
};

export type UpdateUserType = {
  name?: string;
  password?: string;
  currentPassword: string;
};

export type TodoType = {
  id: number;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  tasks: TaskType[];
};

export type TodoQueriesType = {
  title?: string;
  page?: string;
  size?: string;
};

export type CreateTodoType = {
  title: string;
  description?: string;
};

export type EditTodoType = {
  title?: string;
  description?: string;
};

export type Paging = {
  current_page: number;
  total_page: number;
  size: number;
};

export type Pageable = {
  data: TodoType[];
  paging: Paging;
};

export type TaskType = {
  id: number;
  name: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
};
