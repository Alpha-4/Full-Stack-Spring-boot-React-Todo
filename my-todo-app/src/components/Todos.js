import React, { useEffect, useState } from "react";
import { allTodosByUsernameApi, deleteTodoApi } from "./apis/TodoServiceApi";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function Todos() {
  const navigate = useNavigate();
  const username = useAuth().username;

  const [todos, setTodos] = useState([]);

  const retrieveAllTodos = () => {
    allTodosByUsernameApi(username)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  const deleteToDo = (id) => {
    deleteTodoApi(username, id)
      .then((res) => {
        console.log(id + "done success");
        retrieveAllTodos();
      })
      .catch((err) => console.log(err));
  };

  const editTodo = (id) => {
    navigate("/todo/" + id);
  };

  useEffect(() => retrieveAllTodos(), []);

  return (
    <div className="container w-10/12 mx-auto px-2 py-2 my-auto min-h-screen overflow-hidden">
      <h1 className="text-3xl font-bold text-center">
        Your TaskList{" "}
        <span
          className="ml-24 cursor-pointer text-1xl text-blue-600 dark:text-blue-900 hover:font-extrabold hover:text-black hover:text-4xl"
          onClick={() => editTodo("")}
        >
          ＋
        </span>
      </h1>

      <div className="my-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 font-extrabold whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                Description
              </th>
              <th className="px-6 py-3 font-extrabold">Target Date</th>
              <th className="px-6 py-3 font-extrabold">Is Completed</th>
              <th className="px-6 py-3 font-extrabold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                  {todo.description}
                </td>

                <td className="px-6 py-3">{todo.targetDate}</td>
                <td className="px-6 py-3">{todo.done.toString()}</td>
                <td className="px-6 py-3 flex flex-wrap justify-between">
                  <span
                    className="cursor-pointer text-1xl text-blue-600 dark:text-blue-500 hover:font-extrabold hover:text-black"
                    onClick={() => editTodo(todo.id)}
                  >
                    ✎
                  </span>
                  <span
                    className="cursor-pointer text-1xl text-blue-600 dark:text-blue-500 hover:font-extrabold hover:text-black"
                    onClick={() => deleteToDo(todo.id)}
                  >
                    d̶e̶l̶e̶t̶e̶
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todos;
