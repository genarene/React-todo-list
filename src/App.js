import "./App.css";
import { useState } from "react";
import CompletedTable from "./Components/CompletedTable";
import Modal from "react-modal";
import Form from "./Components/Form";
import GeneratedTable from "./Components/GeneratedTable";

// the main component rendering the app;
function App() {
  // setting the state of the task array
  const [tasks, setTasks] = useState([]);

  // setting the state of the modal containing the form
  const [isOpen, setIsOpen] = useState(false);

  // updating the state of the completedTable tasks
  const [doneTasks, setDoneTasks] = useState([]);

  // state for editing tasks
  const [editTask, setEditTask] = useState({});
  return (
    <div
      className="container flex flex-col justify-center items-center m-36 
     bg-gray-900 rounded-md shadow-lg pt-12"
    >
      <div
        className=" flex justify-around font-mono text-3xl
       bg-white bg-opacity-25 py-5 px-5
       rounded h-50"
      >
        <h1 className="text-4xl font-bold text-white mr-10">
          {/* checking if the task is less than two to display 'task' and more than one to display 'tasks' */}
          {tasks.length <= 1 || 0 ? (
            <h1>
              You have <span className="text-pink-500">{tasks.length}</span>{" "}
              task today
            </h1>
          ) : (
            <h1>
              {" "}
              Hey there you have{" "}
              <span className="text-pink-500">{tasks.length}</span> tasks today{" "}
            </h1>
          )}
        </h1>

        {/* button that triggers the modal containing the form */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-pink-500 text-white hover:bg-gray-900
           font-bold py-2 px-4 rounded-full text-xl shadow-lg  
           "
          style={{ outline: "none" }}
        >
          Create your Task
        </button>
      </div>

      {/* generateTable component that receives the updated tasks state */}
      <GeneratedTable
        tasks={tasks}
        doneTasks={doneTasks}
        setDoneTasks={setDoneTasks}
        setTasks={setTasks}
        setEditTask={setEditTask}
        setModal={setIsOpen}
      />

      {/* the completedTable renders the already completed tasks */}
      <CompletedTable
        doneTasks={doneTasks}
        tasks={tasks}
        setTasks={setTasks}
        setDoneTasks={setDoneTasks}
      />

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
}

export default App;
