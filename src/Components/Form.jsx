import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { taskContext } from "../context/TaskContext";

// form component to tap the inputs from user
const Form = ({ isOpen, setIsOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // set the error state incase no input is filled the error will be triggered
  const [error, setError] = useState(false);

  // set the state of the input
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const { editTask, setEditTask, refetch, setRefetch } =
    useContext(taskContext);

  // functions to target the input values
  const changeTaskInput = (event) => {
    setTaskInput(event.target.value);
    setError(false);
  };
  const changeDescription = (event) => {
    setDescriptionInput(event.target.value);
    setError(false);
  };

  // function that generates the tasks into an object and submits them to the task array
  const submitTasks = () => {
    let task = {
      userId: user.id,
      completed: false,
      title: taskInput,
      description: descriptionInput,
    };

    if (taskInput) {
      fetch(`https://user-manager-three.vercel.app/api/todo/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            toast.error("unable to add task");
          } else {
            toast.success("task added");
          }
          setTaskInput("");
          setDescriptionInput("");
          setRefetch(!refetch);
        })
        .catch((err) => {
          console.log("this error occurred", err);
        });
    } else {
      // if there is no value in the task the error is set to true
      setError(true);
    }
  };

  const updateTask = () => {
    let changedTask = {
      id: editTask.id,
      title: taskInput,
      description: descriptionInput,
    };

    if (taskInput) {
      fetch(`https://user-manager-three.vercel.app/api/todo/update`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(changedTask),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            toast.error("unable to edit task");
          } else {
            toast.success("task edited");
          }
          setTaskInput("");
          setDescriptionInput("");
          setEditTask({});
          setRefetch(!refetch);
          setIsOpen(false);
        })
        .catch((err) => {
          console.log("this error occurred", err);
        });
    } else {
      // if there is no value in the task the error is set to true
      setError(true);
    }
  };

  // update the input values in the editTask
  useEffect(() => {
    if (editTask) {
      // for taskInput
      setTaskInput(editTask.title);
      setDescriptionInput(editTask.description);
    }
    return () => {};
  }, [editTask]);

  return (
    <div className="relative h-full">
      <h3 className=" flex justify-center mt-5 font-bold text-2xl">
        Add Your Task
      </h3>

      <form className="">
        <div className=" flex  flex-col pt-8">
          <label className="text-lg font-semibold">
            What is your task:
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded w-full py-2 px-4 text-gray-700
               leading-tight focus:outline-none focus:bg-purple-300 focus:border-purple-300 active:bg-purple-300"
              name="task"
              onChange={changeTaskInput}
              value={taskInput}
              type="text"
            />
          </label>
          {/* set the error to display red incase the input is empty */}
          {error ? (
            <h1
              style={{
                color: "red",
                textAlign: "center",
                fontFamily: "fantasy",
              }}
            >
              please enter a task !
            </h1>
          ) : null}
        </div>
        <div className="mt-10">
          <label className="text-lg font-semibold  pt-8 ">Description:</label>
          <textarea
            onChange={changeDescription}
            value={descriptionInput}
            className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded w-full py-6 px-4 text-gray-700 text-lg
               leading-tight focus:outline-none focus:bg-purple-300 focus:border-purple-300 active:bg-purple-300"
          />
        </div>{" "}
        <div className="flex  absolute bottom-1 left-1/3">
          {/* button to submit tasks to the generated table */}
          <button
            className="bg-indigo-900 text-white hover:bg-purple-400
           font-bold py-2 px-4 rounded-md text-xl shadow-lg mr-10"
            onClick={editTask.id ? () => updateTask() : () => submitTasks()}
            type="button"
            style={{ outline: "none" }}
          >
            {editTask.id ? "Edit" : "Add"}
          </button>
          {/* button to close the form once clicked */}
          <button
            className="bg-indigo-900 text-white hover:bg-purple-400
           font-bold py-2 px-4 rounded-md text-xl shadow-lg  "
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{ outline: "none" }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
