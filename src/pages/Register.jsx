import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TodoIcon from "../assets/TodoIcon";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const history = useHistory();

  // target the input values
  const changeUserName = (event) => {
    setUser({ ...user, username: event.target.value });
  };
  const changeEmailInput = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const changePasswordInput = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const handleRegister = () => {
    fetch(`https://user-manager-three.vercel.app/api/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          toast.error("user already exist!");
        } else {
          toast.success("register successful, please login");
          history.push("/login");
        }
      })
      .catch((err) => {
        toast.error("credentials already exist!");
      });
  };
  return (
    <div className="m-0 p-0  grid grid-cols-2 h-screen">
      <div className="h-full flex flex-col justify-center items-center">
        <h2 className="mb-14 text-4xl">Sign Up to create an account</h2>
        <form className="flex flex-col w-full justify-center items-center">
          <label className="text-xl font-medium">Username</label>
          <input
            type="text"
            name="username"
            onChange={changeUserName}
            value={user.username}
            className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded  py-2 px-4 w-100 text-gray-700
               leading-tight focus:outline-none focus:bg-gray-300 focus:border-indigo-800 mb-6"
          />

          <label className="text-xl font-medium">Email</label>
          <input
            type="email"
            name="email"
            onChange={changeEmailInput}
            value={user.email}
            className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded  py-2 px-4 text-gray-700
               leading-tight focus:outline-none focus:bg-gray-300 focus:border-indigo-800 mb-6 "
          />

          <label className="text-xl font-medium">Password</label>
          <input
            type="password"
            name="password"
            onChange={changePasswordInput}
            value={user.password}
            className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded  py-2 px-4 text-gray-700
               leading-tight focus:outline-none focus:bg-gray-300 focus:border-indigo-800 mb-6"
          />

          <button
            className="bg-indigo-900 text-white hover:bg-purple-500
           font-bold py-1 px-6 rounded-md text-xl shadow-xl "
            onClick={handleRegister}
            type="button"
          >
            Register
          </button>
          <button
            onClick={() => history.push("/login")}
            className="bg-indigo-900 text-white hover:bg-purple-500
           font-bold py-1 px-6 rounded-md text-xl shadow-xl mt-10"
            type="button"
          >
            Login
          </button>
        </form>
      </div>
      <div
        className=" h-full flex items-center justify-center"
        style={{ backgroundColor: "#0E123E" }}
      >
        <div className="-top-5 ">
          <TodoIcon />
        </div>
      </div>
    </div>
  );
};

export default Register;
