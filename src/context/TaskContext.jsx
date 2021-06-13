import React, { useState } from "react";

export const taskContext = React.createContext(null);

const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  return (
    <taskContext.Provider value={{ tasks, setTasks }}>
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskContextProvider;
