import React from "react";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// component to generate styled radio checkers

const RadioInputs = ({ name, value, label, onChange, defaultChecked }) => {
  return (
    <div className="flex items-center mr-4 mb-4">
      <input
        id={value}
        type="radio"
        name={name}
        className="hidden"
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />

      {/* the label for the radio inputs */}
      <label for={value} className="flex items-center cursor-pointer text-xl">
        <span className="w-8 h-8 inline-block mr-2 rounded-full flex-no-shrink font-bold"></span>
        {label}
      </label>
    </div>
  );
};

// form component to tap the inputs from user
const Form = ({ tasks, setTasks, isOpen, setIsOpen, editTask }) => {
  // set the error state incase no input is filled the error will be triggered
  const [error, setError] = useState(false);

  // set the state of the input
  const [taskInput, setTaskInput] = useState("");

  // setting the state of the date picked
  const [pickedDate, setPickedDate] = useState(new Date());

  // change the radio type when clicked
  const [radioInput, setRadioInput] = useState("");

  // functions to target the input values
  const changeTaskInput = (event) => {
    setTaskInput(event.target.value);
    setError(false);
  };

  const changeRadioInput = (event) => {
    setRadioInput(event.target.value);
  };

  // function that generates the tasks into an object and submits them to the task array
  const submitTasks = () => {
    const task = {
      id: uuid(),
      task: taskInput,
      date: pickedDate,
      status: "pending",
      priority: radioInput,
    };
    if (taskInput) {
      setTasks([...tasks, task]);
    } else {
      // if there is no value in the task the error is set to true
      setError(true);
    }
  };

  // update the input values in the editTask
  useEffect(() => {
    if (editTask) {
      // for taskInput
      setTaskInput(editTask.task);

      // for dateinput
      setPickedDate(editTask.date);

      // for priority
      setRadioInput(editTask.priority);
    }
    return () => {};
  }, [editTask]);

  return (
    <div className="relative h-full">
      <h3 className=" flex justify-center mt-5 font-bold text-2xl">
        Add Your Task
      </h3>

      <form className="">
        <div className=" flex  flex-col pt-8">
          <label className="text-lg font-semibold">
            What is your task:
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded w-full py-2 px-4 text-gray-700
               leading-tight focus:outline-none focus:bg-pink-300 focus:border-pink-300"
              name="task"
              onChange={changeTaskInput}
              value={taskInput}
              type="text"
            />
          </label>
          {/* set the error to display red incase the input is empty */}
          {error ? (
            <h1
              style={{
                color: "red",
                textAlign: "center",
                fontFamily: "fantasy",
              }}
            >
              please enter a task !
            </h1>
          ) : null}

          <label className="text-lg font-semibold  pt-8">Task Date:</label>

          {/* imported date library to display the date picked in the form */}
          <DatePicker
            showTimeSelect
            selected={pickedDate}
            onChange={(date) => setPickedDate(date)}
            className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded w-full py-2 px-4 text-gray-700
               leading-tight focus:outline-none focus:bg-pink-300 focus:border-pink-300"
          />
        </div>
        <p className=" flex justify-center text-lg font-semibold  pt-8">
          Task priority
        </p>
        <div className="flex justify-center mt-5">
          {/* reusing the radioInput component */}
          <RadioInputs
            name="taskPriority"
            value="normal"
            label="Normal"
            onChange={changeRadioInput}
          />

          <RadioInputs
            name="taskPriority"
            value="minor"
            label="Minor"
            onChange={changeRadioInput}
          />

          <RadioInputs
            name="taskPriority"
            label="Critical"
            value="critical"
            onChange={changeRadioInput}
          />
        </div>

        <div className="flex  absolute bottom-1 left-1/3">
          {/* button to submit tasks to the generated table */}
          <button
            className="bg-gray-900 text-white hover:bg-pink-500
           font-bold py-2 px-4 rounded-md text-xl shadow-lg mr-10"
            onClick={submitTasks}
            type="button"
            style={{ outline: "none" }}
          >
            Add
          </button>
          {/* button to close the form once clicked */}
          <button
            className="bg-gray-900 text-white hover:bg-pink-500
           font-bold py-2 px-4 rounded-md text-xl shadow-lg  "
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{ outline: "none" }}
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
