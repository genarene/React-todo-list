import React from "react";
import { format } from "date-fns";

// the CompletedTable that renders the completed tasks from the generatedTable
const CompletedTable = ({ doneTasks, setDoneTasks, tasks, setTasks }) => {
  // function to receive the completed tasks and create a table to display them
  const completedTableData = () => (
    <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800 table-auto">
      {/* the table header */}
      <tr className="text-left border-b-2 border-gray-300">
        <th className="px-4 py-3">Task</th>
        <th className="px-4 py-3">Date</th>
        <th className="px-4 py-3">Status</th>
        <th className="px-4 py-3">Priority</th>
        <th className="px-4 py-3">Mark as incomplete</th>
      </tr>

      {/* the table data */}
      {/* looping through the array of tasks to generate the table data */}
      {doneTasks.map((doneTask, index) => {
        return (
          <tr className="bg-gray-100 border-b border-gray-200 opacity-50">
            <td className="px-4 py-3">{doneTask.task}</td>
            <td className="px-4 py-3">
              {format(doneTask.date, "dd-MM-yyyy HH:mm aaa")}
            </td>
            <td className="px-4 py-3 ">
              <span className=" bg-green-200 text-green-500 rounded-full py-1 px-5 h-5">
                {doneTask.status}
              </span>
            </td>
            <td className="px-4 py-3">{doneTask.priority}</td>

            <td className="px-4 py-3">
              {/* buttons to toggle between completed and edit */}
              <button
                className="bg-pink-500 text-white hover:bg-gray-900
           font-bold py-1 px-5 rounded-full text-sm shadow-lg "
                style={{ outline: "none" }}
                onClick={() => {
                  const incompleteTask = {
                    ...doneTask,
                    status: "pending",
                  };
                  setTasks([...tasks, incompleteTask]);

                  // filtering the donetask array to return the item not selected
                  setDoneTasks(
                    doneTasks.filter((item) => item.id !== doneTask.id)
                  );
                }}
              >
                redo task
              </button>
            </td>
          </tr>
        );
      })}
    </table>
  );
  return (
    <>
      <h2
        className="text-2xl font-bold text-white mr-10 bg-white bg-opacity-25 py-1 px-5 mt-5
       rounded h-50"
      >
        Completed
      </h2>

      {/* call the completeTableData */}
      <>{completedTableData()}</>
    </>
  );
};

export default CompletedTable;
