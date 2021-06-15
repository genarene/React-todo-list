import React, { useState, useEffect } from "react";

export const taskContext = React.createContext(null);

const TaskContextProvider = (props) => {
  const [editTask, setEditTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("ewqdeqdedqewdew");
    fetch(`https://user-manager-three.vercel.app/api/todo?userId=${user.id}`)
      .then((res) => res.json())
      .then((result) => {
        setTasks(result.body);
      })
      .catch((err) => {
        console.log("this error occurred", err);
      });
  }, [refetch]);
  console.log(refetch);

  return (
    <taskContext.Provider
      value={{ tasks, setTasks, refetch, setRefetch, editTask, setEditTask }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskContextProvider;
