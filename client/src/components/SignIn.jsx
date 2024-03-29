import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const signInHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    axios
      .post("https://food-discovery-backend.onrender.com/auth/login", data)
      .then((response) => {
        if (response.status !== 200) {
          setCookies("token", null);
          localStorage.removeItem("token");
          return;
        }
        const token = jwtDecode(response.data.token);
        setCookies("token", token);
        localStorage.setItem("token", JSON.stringify(token));

        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <form
      onSubmit={signInHandler}
      className="border border-gray-300 rounded-lg shadow-md p-4 mx-auto inline-block text-left w-1/3 flex justify-center items-center"
    >
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="username">Username</label>
        <input required type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <button
          className="mt-10 border-2 border-black bg-black text-slate-50 p-2 shadow-lg hover:bg-slate-50 hover:text-black"
          type="submit"
        >
          Sign In
        </button>

        {/* Register Button */}
        <button
          className="mt-10 border-2 border-black bg-black text-slate-50 p-2 shadow-lg hover:bg-slate-50 hover:text-black text-xs"
          type="submit"
        >
          <Link to="/auth/register">
            Don't have account!
            <span className="hover:text-red-800"> Register</span>
          </Link>
        </button>
      </div>
    </form>
  );
}

export default SignIn;
