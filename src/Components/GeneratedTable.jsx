import React, { useContext } from "react";
import { format } from "date-fns";
import { BiTask } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { taskContext } from "../context/TaskContext";
import { toast } from "react-toastify";

// component that generates a table of the tasks filled in the form
const GeneratedTable = ({ isOpen, setIsOpen }) => {
  // function to actively receive the data and generate a table
  const { tasks, refetch, setRefetch, setEditTask } = useContext(taskContext);

  // deleting the task
  const handleDelete = (task) => {
    fetch(
      `https://user-manager-three.vercel.app/api/todo/delete?todoId=${task.id}`
    )
      .then((res) => res.json())
      .then((result) => {
        setRefetch(!refetch);
        if (result.error) {
          toast.error("task no deleted!");
        } else {
          toast.dark("task deleted");
        }
      })
      .catch((err) => {
        console.log("this error occurred", err);
      });
  };

  // check task as completed

  const completeHandler = (task) => {
    let updateData = {
      id: task.id,
      completed: true,
    };

    fetch(`https://user-manager-three.vercel.app/api/todo/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((result) => {
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log("this error occurred", err);
      });
  };

  const renderTableData = () => {
    return (
      <div
        className=" grid rounded-md mx-10 gap-x-3  overflow-y-scroll  mt-8  text-gray-800"
        style={{
          gridTemplateColumns: "1fr 1fr",
          height: "70vh",
          backgroundColor: "#E3E8F1",
        }}
      >
        {/* map through the tasks array received from the app.js to generate data*/}
        {tasks.map((task, index) => {
          const backgroundChange = task.completed
            ? {
                backgroundImage:
                  " linear-gradient(to right, #af91eb, #b69aed, #bea4ef, #c5adf0, #ccb7f2)",
                height: "160px",
              }
            : { backgroundColor: "#ffff", height: "160px" };
          return (
            <div
              key={task.userId}
              className="flex  mb-2 rounded-md items-center py-3"
              style={backgroundChange}
            >
              <div className="ml-10 py-4 rounded-lg flex justify-center">
                <BiTask
                  color={task.completed ? "#ffff" : "#AF91EB"}
                  size="3.5rem"
                />
              </div>
              <div className=" ml-10 flex flex-col w-1/2">
                <div className="flex ">
                  <h3 className="font-semibold text-xl">{task.title}</h3>
                </div>

                <div className="text-sm ">
                  <span className="text-gray-700 font-bold text-sm ">
                    Date Created:
                  </span>{" "}
                  {format(new Date(task.dateCreated), "dd-MM-yyyy HH:mm aaa")}
                </div>
                <div className="text-sm">
                  <span className="text-indigo-900 font-bold text-md">
                    Description:
                  </span>{" "}
                  <span className="text-indigo-900 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center ml-auto ">
                <div className="px-4 py-3 cursor-pointer">
                  <BsCheckCircle
                    color="#0E123E"
                    size="1.6rem"
                    onClick={() => completeHandler(task)}
                  />
                </div>
                <div className="px-4 py-3 cursor-pointer">
                  <FaRegEdit
                    size="1.5rem"
                    color="#0E123E"
                    onClick={() => {
                      setEditTask(task);
                      setIsOpen(true);
                    }}
                  />
                </div>
                <div className="px-4 py-3 cursor-pointer">
                  <FaTrashAlt
                    size="1.5rem"
                    color="#0E123E"
                    onClick={() => handleDelete(task)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // call the renderTableData
  return <>{renderTableData()}</>;
};

export default GeneratedTable;
