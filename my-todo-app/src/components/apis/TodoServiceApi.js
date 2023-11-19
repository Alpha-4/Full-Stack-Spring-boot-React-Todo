import { apiClient } from "./ApiClient";

export const allTodosByUsernameApi = (name) =>
  apiClient.get(`/users/${name}/todos`);

export const todoByIdApi = (name, id) =>
  apiClient.get(`/users/${name}/todos/${id}`);

export const deleteTodoApi = (name, id) =>
  apiClient.delete(`/users/${name}/todos/${id}`);

export const updateTodoApi = (name, id, todo) =>
  apiClient.put(`/users/${name}/todos/${id}`, todo);

export const addNewTodoApi = (name, todo) =>
  apiClient.post(`/users/${name}/todos`, todo);

export const getBeanTodo = (
  id = 1,
  username,
  description,
  targetDate,
  isCompleted
) => {
  return {
    username: username,
    description: description,
    targetDate: targetDate,
    done: isCompleted,
    id: id,
  };
};
