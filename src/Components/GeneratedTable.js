import React from "react";
import { format } from "date-fns";

// component that generates a table of the tasks filled in the form
const GeneratedTable = ({
  tasks,
  doneTasks,
  setDoneTasks,
  setTasks,
  setEditTask,
  setModal,
}) => {
  // function to actively receive the data and generate a table

  const renderTableData = () => {
    return (
      <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800 table-auto">
        <tr className="text-left border-b-2 border-gray-300">
          <th className="px-4 py-3">Task</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Priority</th>
          <th className="px-4 py-3">Mark as Done</th>
          <th className="px-4 py-3">Edit task</th>
        </tr>

        {/* map through the tasks array received from the app.js to generate data*/}
        {tasks.map((task, index) => {
          // change the color depending on priority picked by user
          const priorityColor =
            task.priority === "normal"
              ? "text-indigo-700"
              : task.priority === "minor"
              ? "text-green-500"
              : "text-red-500";
          return (
            <tr className="bg-gray-100 border-b border-gray-200" key={task.id}>
              <td className="px-4 py-3">{task.task}</td>
              <td className="px-4 py-3">
                {format(task.date, "dd-MM-yyyy HH:mm aaa")}
              </td>
              <td className="px-4 py-3">
                <span className=" bg-red-200 text-red-500 rounded-full py-1 px-5 h-5">
                  {task.status}
                </span>
              </td>
              <td className={`px-4 py-3 ${priorityColor}`}>{task.priority}</td>
              <td className="px-4 py-3">
                {/* button to check the tasks as completed and remove from the table */}
                <button
                  className="bg-gray-900 text-white hover:bg-pink-500
           font-bold py-1 px-5 rounded-full text-sm shadow-lg "
                  style={{ outline: "none" }}
                  onClick={() => {
                    const updatedTask = {
                      ...task,
                      status: "complete",
                    };
                    setDoneTasks([...doneTasks, updatedTask]);

                    // filtering the tasks array and return the item not selected
                    setTasks(tasks.filter((item) => item.id !== task.id));
                  }}
                >
                  complete
                </button>
              </td>
              <td className="px-4 py-3">
                {/* the edit task button */}
                <button
                  className="border-2 border-pink-500 py-0 px-6"
                  style={{ outline: "none" }}
                  onClick={() => {
                    // trigger the form to appear
                    setModal(true);

                    // setEditTask to the specific task clicked
                    setEditTask(task);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    );
  };

  // call the renderTableData
  return <>{renderTableData()}</>;
};

export default GeneratedTable;
