import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { taskContext } from "../context/TaskContext";
import Avatar from "react-avatar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LineChart from "../Components/ui/LineChart";

// the main component rendering the app;
const Home = () => {
  const { tasks } = useContext(taskContext);
  const [value, onChange] = useState(new Date());

  // getting the number of completed tasks
  const completedTaskLength = tasks.filter((task) => task.completed).length;

  //  getting the length of the pending tasks
  const taskLength = tasks.filter((task) => !task.completed).length;

  // calculating the percentage of the completed task to be renderd in the progress bar
  const percentage = (completedTaskLength / tasks.length) * 100;

  // useHistory
  const history = useHistory();
  const viewAllTasks = () => {
    history.push("/task");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="p-6 grid h-full"
      style={{ gridTemplateColumns: "auto 25rem" }}
    >
      <div>
        <h1
          className="text-2xl font-bold  mr-10 py-4 px-4 rounded-md text-xl bg-white "
          style={{ color: "#0E123E" }}
        >
          {/* checking if the task is less than two to display 'task' and more than one to display 'tasks' */}
          {taskLength <= 1 || 0 ? (
            <h1>
              Hey {user.email}{" "}
              <span className="text-purple-500">{taskLength}</span> pending task
            </h1>
          ) : (
            <h1>
              {" "}
              Hey Nazarene you have{" "}
              <span className="text-purple-500">{taskLength}</span> pending
              tasks{" "}
            </h1>
          )}
        </h1>
        <div className="flex ">
          <LineChart />
          <div className="h-1/9 w-2/6 p-6 bg-white mt-8 rounded-lg">
            <h2 className="pb-2 text-purple-900 font-bold text-lg">
              {" "}
              Your Progress
            </h2>

            <CircularProgressbar
              value={percentage ? percentage : 0}
              text={percentage ? `${percentage.toFixed(1)}%` : "0%"}
              styles={buildStyles({
                strokeLinecap: "round",

                textSize: "16px",

                pathTransitionDuration: 0.5,

                // Colors
                pathColor: `rgba(14, 18, 62, ${percentage / 100})`,
                textColor: "#0E123E",
                trailColor: "#AF91EB",
                backgroundColor: "#0E123E",
              })}
            />
            <div className="flex justify-between pt-8 text-purple-900 font-bold">
              <h2
                className="text-purple-100  py-1 px-3 rounded-md"
                style={{ backgroundColor: "#0E123E" }}
              >
                Completed
              </h2>
              <h2
                className="text-purple-100  py-1 px-3 rounded-md"
                style={{ backgroundColor: "#AF91EB" }}
              >
                Pending
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white mt-10 p-6 mr-10 text-purple-900 font-bold ">
          <div>
            <h2>Recently Completed</h2>
          </div>
        </div>
      </div>
      <div className="h-full bg-white p-5 rounded-lg">
        <div className="flex flex-col justify-center items-center mb-10">
          <Avatar
            name="Nazarene Wairimu"
            textSizeRatio={1.75}
            round
            color="#AF91EB"
            size="86"
          />
          <h2 className="font-bold text-lg" style={{ color: "#0E123E" }}>
            Nazarene
          </h2>
          <h3 className="text-gray-500">Software Engineer</h3>
        </div>
        <Calendar onChange={onChange} value={value} />
        <div className="mt-12">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">New Tasks</h2>
            <span
              className="font-medium text-gray-500 cursor-pointer hover:text-purple-600 font-semibold "
              onClick={viewAllTasks}
            >
              View All
            </span>
          </div>

          {/* to display 3 tasks in the home page */}
          {tasks.slice(0, 3).map((task) => (
            <div className="flex justify-between mt-6">
              <div>
                <h3 className="text-lg font-bold">{task.title} </h3>
                <h6 className="text-gray-500">
                  {format(new Date(task.dateCreated), "dd-MM-yyyy HH:mm aaa")}
                </h6>
              </div>
              <span className="font-bold text-2xl text-gray-500">:</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
