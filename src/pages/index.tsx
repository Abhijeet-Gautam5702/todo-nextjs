import { Inter } from "next/font/google";
import { useState } from "react";

import { FiTrash2 } from "react-icons/fi";

const inter = Inter({ subsets: ["latin"] });

type taskList = Array<taskType>;
type taskType = {
  id: number;
  title: string;
  isDone: boolean;
};

const lisOfTasks: taskList = [];
export default function Home() {
  const [tasks, setTasks] = useState(lisOfTasks);
  const [formData, setFormData] = useState({ todo: "" });

  function handleAddTaskClick() {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.push({ id: Math.random(), title: formData.todo, isDone: true });
      return newTasks;
    });
    setFormData({ todo: "" });
    // console.log(tasks);
  }

  function handleFormDataChange(e: any) {
    const { value, name } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleDeleteTaskClick(id: number) {
    console.log(id);
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks].filter((task) => task.id !== id);
      return updatedTasks;
    });
  }

  return (
    <main className="h-screen flex flex-col  items-center justify-center p-5">
      <h1 className="text-center text-4xl tracking-wide font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-violet-900">
        To-Do with NextJS and Tailwind CSS
      </h1>
      <div className="mt-14 md:w-1/2  sm:w-full w-full flex flex-row justify-center">
        <input
          className=" w-9/12 p-2 rounded-sm text-black focus:outline-none"
          type="text"
          name="todo"
          id="todo"
          placeholder="Add a task"
          value={formData.todo}
          onChange={handleFormDataChange}
        />
        <button
          className="w-2/12 ml-2 rounded-sm p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-900 focus:outline-none"
          onClick={handleAddTaskClick}
        >
          Add
        </button>
      </div>
      {tasks.length > 0 && (
        <div className="  h-56 overflow-y-auto w-full sm:w-4/5 md:w-1/2 mt-6 px-5 ">
          {tasks.map((task) => {
            return (
              <div
                key={Math.random()}
                className="flex flex-row justify-between items-center bg-gray-950  rounded-md shadow-md my-4 py-2 px-4 bg-clip-border  bg-gradient-to-r from-blue-500 via-purple-500 to-violet-900"
              >
                <p className=" font-semibold">{task.title}</p>
                <div onClick={() => handleDeleteTaskClick(task.id)}>
                  <FiTrash2 />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
