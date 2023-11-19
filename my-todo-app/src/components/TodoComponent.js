import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import {
  addNewTodoApi,
  getBeanTodo,
  todoByIdApi,
  updateTodoApi,
} from "./apis/TodoServiceApi";

function TodoComponent() {
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();
  const username = auth.username;

  const { id } = useParams();

  useEffect(() => {
    todoByIdApi(username, id)
      .then((res) => {
        setDescription(res.data.description);
        setTargetDate(res.data.targetDate);
        setIsCompleted(res.data.done);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const updateTodo = () => {
    updateTodoApi(
      username,
      id,
      getBeanTodo(id, username, description, targetDate, isCompleted)
    )
      .then((res) => {
        navigate("/todos");
      })
      .catch((err) => console.log(err));
  };

  const createTodo = () => {
    addNewTodoApi(
      username,
      getBeanTodo(id, username, description, targetDate, false)
    )
      .then((res) => {
        navigate("/todos");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="text-gray-900 font-bold text-2xl m-2 p-2 text-center">
        {id && "Your Todo"}
        {id === undefined && "New Todo"}
      </h1>
      <div className="container w-10/12 mx-auto px-2 py-2 my-auto min-h-screen text-center justify-around basis-1/2 flex-row">
        <div>
          <label className="my-3 p-2.5 text-sm font-semibold text-gray-700 dark:text-white">
            Description
          </label>
          <input
            type="text"
            className="min-w-min my-3 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="todo description"
            name="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="my-3 p-2.5 text-sm font-semibold text-gray-700 dark:text-white">
            Target Date
          </label>
          <input
            type="date"
            className="my-3 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="targetDate"
            value={targetDate}
            onChange={(event) => {
              setTargetDate(event.target.value);
            }}
            required
          />
        </div>

        {id && (
          <div>
            <label className="my-3 p-2.5 text-sm font-semibold text-gray-700 dark:text-white">
              Completed
            </label>
            <input
              type="checkbox"
              className="my-3 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="isCompleted"
              checked={isCompleted}
              onChange={(event) => {
                setIsCompleted(event.target.checked);
              }}
              required
            />
          </div>
        )}
        {id && (
          <button
            className="mx-auto my-3 w-1/5 p-2.5 text-sm font-bold text-white bg-lime-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 dark:border-gray-600  dark:focus:ring-yellow-500 dark:focus:border-yellow-500 self-center"
            type="submit"
            onClick={updateTodo}
          >
            update
          </button>
        )}
        {id === undefined && (
          <button
            className="mx-auto my-3 w-1/5 p-2.5 text-sm font-bold text-white bg-lime-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 dark:border-gray-600  dark:focus:ring-yellow-500 dark:focus:border-yellow-500 self-center"
            type="submit"
            onClick={createTodo}
          >
            Create
          </button>
        )}
      </div>
    </>
  );
}

export default TodoComponent;
