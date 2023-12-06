import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] =  useCookies(['User'])

  useEffect(()=>{
    if(cookies.User){
      navigate('/')
    }
  },[])

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [mainError, setMainError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/login", userData, {
      withCredentials: true,
    });
    // console.log(response.data.user);
    // let userDetails = response.data.user;

    if (response.data.message === "User not exists") {
      setMainError("User not exists");
    }
    if (response.data.message === "password doesn't match") {
      setMainError("password does not match");
    }
    if (response.data.message === "loggedIn") {
      setMainError("");

      navigate("/");
    }
  };
  return (
    <div>
      <div
        class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')",
        }}
      >
        <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div class="text-white">
            <div class="mb-8 flex flex-col items-center">
              <img
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                width="150"
                alt=""
                srcset=""
              />
              <h1 class="mb-2 text-2xl">Instagram</h1>
              <span class="text-gray-300">Enter Login Details</span>
            </div>
            <p className="text-center text-red-700 text-xl mb-2">{mainError}</p>
            <form onSubmit={handleSubmit}>
              <div class="mb-4 text-lg">
                <input
                  class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="id@email.com"
                />
              </div>

              <div class="mb-4 text-lg">
                <input
                  class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="*********"
                />
              </div>
              <div class="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  class="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <p className="text-gray-300 text-center">Don't you have an account</p>
          <Link className="text-gray-300 ml-24 " to="/user/signup">
            signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
