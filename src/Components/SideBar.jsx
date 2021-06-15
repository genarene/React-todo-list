import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTasks, FaHome, FaRegListAlt } from "react-icons/fa";
import Button from "./ui/button";
import TodoIcon from "../assets/TodoIcon";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import Form from "../Components/Form";

const SideBar = ({ isOpen, setIsOpen }) => {
  // setting the state of the task array
  const [tasks, setTasks] = useState([]);

  const history = useHistory();

  // state for editing tasks
  const [editTask] = useState({});

  const logOutHandler = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <div className="h-full p-6 ">
      <div className="flex  items-center mb-24">
        <FaTasks color="#AF91EB" size="3rem" />{" "}
        <h2 className="text-white text-4xl font-bold ml-4">TaskIT</h2>
      </div>
      {/* the nav bar */}
      <nav className="text-2xl flex flex-col text-white">
        {/* to link the paths in the navbar */}
        <NavLink
          activeClassName="bg-purple-400"
          className="mb-10  hover:bg-purple-400   py-2 px-4 rounded-md   flex  items-center"
          to="/home"
        >
          <FaHome size="2rem" /> <h3 className="ml-4 ">Home</h3>
        </NavLink>

        <NavLink
          activeClassName="bg-purple-400"
          className="hover:bg-purple-400  py-2 px-4 rounded-md   flex  items-center "
          to="/task"
        >
          <FaRegListAlt size="2rem" />
          <h3 className="ml-4">Task</h3>
        </NavLink>
      </nav>

      <div
        className=" relative h-1/3 rounded-lg mt-60 mb-10 flex flex-col items-center justify-center "
        style={{ backgroundColor: "#F1EDFC" }}
      >
        <div className="-top-5 ">
          <TodoIcon width={140} height={140} />
        </div>
        <p className="mb-8 text-gray-700 font-semibold">
          Click here to add tasks
        </p>

        {/* button to open the form module */}
        <Button text=" + Add task" handler={() => setIsOpen(true)} />
      </div>
      <Button text="LogOut" handler={() => logOutHandler()} />

      {/* the modal that displays the form */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
          content: {
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "8px",
            outline: "none",
            padding: "20px",
            width: "650px",
            height: "auto",
            fontFamily: "monospace",
            fontWeight: "1.2rem",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          },
        }}
      >
        {/* the form component that receives the task inputs */}
        <Form
          tasks={tasks}
          setTasks={setTasks}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editTask={editTask}
        />
      </Modal>
    </div>
  );
};

export default SideBar;
