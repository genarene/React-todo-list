import React, { useContext } from "react";
import { format } from "date-fns";
import { BiTask } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { taskContext } from "../context/TaskContext";

// component that generates a table of the tasks filled in the form
const GeneratedTable = ({ isOpen, setIsOpen }) => {
  // function to actively receive the data and generate a table
  const { tasks, setTasks } = useContext(taskContext);

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
          // change the color depending on priority picked by user
          const priorityColor =
            task.priority === "normal"
              ? "text-indigo-700 bg-indigo-200 px-20 rounded-lg"
              : task.priority === "minor"
              ? "text-green-500 bg-green-200 px-20 rounded-lg"
              : "text-red-500 bg-red-200 px-20 rounded-lg";

          const statusColor =
            task.status === "complete"
              ? " bg-green-200 ml-10 text-green-500 rounded-full py-1 px-5 h-5"
              : " bg-red-200 ml-10 text-red-500 rounded-full px-5 py-1 h-5 ";

          const backgroundChange =
            task.status === "complete"
              ? {
                  backgroundImage:
                    " linear-gradient(to right, #af91eb, #b69aed, #bea4ef, #c5adf0, #ccb7f2)",
                  height: "120px",
                }
              : { backgroundColor: "#ffff", height: "120px" };
          return (
            <div
              key={task.id}
              className="flex  mb-2 rounded-md items-center py-3"
              style={backgroundChange}
            >
              <div className="ml-10 py-4 rounded-lg flex justify-center">
                <BiTask
                  color={task.status === "complete" ? "#ffff" : "#AF91EB"}
                  size="3.5rem"
                />
              </div>
              <div className=" ml-10 flex flex-col w-1/2">
                <div className="flex ">
                  <h3 className="font-semibold text-xl">{task.task}</h3>
                  <p className="">
                    <span className={`${statusColor}`}>{task.status}</span>
                  </p>
                </div>

                <div className="text-sm ">
                  <span className="text-gray-700 font-bold text-sm ">Due:</span>{" "}
                  {format(new Date(task.date), "dd-MM-yyyy HH:mm aaa")}
                </div>
                <p className={` justify-center  ${priorityColor}`}>
                  <span className="text-gray-700 font-bold text-sm ">
                    Priority:
                  </span>{" "}
                  {task.priority}
                </p>
              </div>
              <div className="flex flex-col items-center ml-auto ">
                <div className="px-4 py-3 cursor-pointer">
                  <BsCheckCircle
                    color="#0E123E"
                    size="1.6rem"
                    onClick={() => {
                      const updatedTask = {
                        ...task,
                        status: "complete",
                      };
                      const index = tasks.findIndex(
                        (item) => item.id === task.id
                      );
                      let tasksCopy = [...tasks];
                      tasksCopy[index] = updatedTask;
                      setTasks(tasksCopy);
                    }}
                  />
                </div>
                <div className="px-4 py-3 cursor-pointer">
                  <FaRegEdit
                    size="1.5rem"
                    color="#0E123E"
                    onClick={() => {
                      setIsOpen(true);
                    }}
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
