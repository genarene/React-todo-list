import React, { useContext } from "react";
import GeneratedTable from "../Components/GeneratedTable";
import { FaCheckCircle, FaTasks } from "react-icons/fa";
import { taskContext } from "../context/TaskContext";

function Task({ isOpen, setIsOpen }) {
  const { tasks } = useContext(taskContext);

  return (
    <div>
      <div className="flex pr-20 pt-10 justify-end ">
        <button
          className="bg-white flex flex-col items-center text-red-400 rounded-md py-4 px-4 h-20 mr-16 
         font-semibold shadow-lg hover:bg-red-200 active:bg-red-200 focus:bg-red-200"
          style={{ outline: "none" }}
        >
          <div className=" mt-0.9  fixed">
            <FaTasks size="1.8rem" color="#e97272" />
          </div>
          <p className="mt-8">pending</p>
        </button>
        <button
          className="bg-white text-purple-800 flex flex-col items-center  rounded-md py-3 px-4 h-20 mr-16
           font-semibold shadow-lg hover:bg-purple-300
        active:bg-purple-300 focus:bg-purple-300 "
          style={{ outline: "none" }}
        >
          <div className=" mt-1 fixed">
            <FaCheckCircle size="1.8rem" />
          </div>
          <p className="mt-8">completed</p>
        </button>
      </div>
      {/* generateTable component that receives the updated tasks state */}
      {tasks.length > 0 ? (
        <GeneratedTable isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <div className="bg-white mt-10 p-6 mr-10 text-purple-900 font-bold text-2xl ml-10 flex justify-center">
          <div>
            <h2>You currently have no task</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
