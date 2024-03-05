import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const registerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    axios
      .post("https://food-discovery-backend.onrender.com/auth/register", data)

      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <form
      onSubmit={registerHandler}
      className="border border-gray-300 rounded-lg shadow-md p-4 mx-auto inline-block text-left w-1/3 flex justify-center items-center"
    >
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="username">Username</label>
        <input required type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <button
          type="submit"
          className="mt-10 border-2 border-black bg-black text-slate-50 p-2 shadow-lg hover:bg-slate-50 hover:text-black"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
