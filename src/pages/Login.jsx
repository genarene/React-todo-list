import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TodoIcon from "../assets/TodoIcon";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const history = useHistory();

  const changeEmailInput = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const changePasswordInput = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const handleLogin = () => {
    fetch(`https://user-manager-three.vercel.app/api/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.error("invalid credentials!");
        } else {
          toast.success("login successful");
          // local storage for user
          localStorage.setItem("user", JSON.stringify(result.body));
          history.push("/home");
        }
      })
      .catch((err) => {
        alert("this error occurred", err);
      });
  };

  return (
    <div className="m-0 p-0  grid grid-cols-2 h-screen">
      <div className="h-full flex flex-col justify-center items-center">
        <h1 style={{ color: "#0E123E" }} className="mb-40 font-bold text-4xl">
          TaskIT
        </h1>
        <h2 className="mb-14 text-4xl ">Sign in to your account</h2>
        <form className="flex flex-col w-full justify-center items-center">
          <label className="text-xl font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={changeEmailInput}
            className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded  py-2 px-4 text-gray-700
               leading-tight focus:outline-none focus:bg-gray-300 focus:border-indigo-800 mb-6 "
          />

          <label className="text-xl font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={changePasswordInput}
            className="bg-gray-200 appearance-none border-2 border-gray-200
               rounded  py-2 px-4 text-gray-700
               leading-tight focus:outline-none focus:bg-gray-300 focus:border-indigo-800 mb-10"
          />

          <button
            type="button"
            onClick={handleLogin}
            className="bg-indigo-900 text-white hover:bg-purple-500
           font-bold py-1 px-6 rounded-md text-xl shadow-xl "
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => history.push("/register")}
            className="bg-indigo-900 text-white hover:bg-purple-500
           font-bold py-1 px-6 rounded-md text-xl shadow-xl mt-10"
          >
            Register
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

export default Login;
