import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useSelector, useDispatch } from "react-redux";

import { fetchData } from "../../redux/Reducers/UserSlice";

import { useNavigate } from "react-router-dom";
const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["User"]);

  const userDetails = useSelector((state) => state.User);
  // console.log(userDetails);
  const fullName = `${userDetails.firstname}  ${userDetails.lastname}`;

  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchData());

  }, []);

  const handleLogout = () => {
    removeCookie("User");
    navigate("/user/login");
  };

  const handleProfile = async () => {
    navigate("/user/profile");
  };

  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
              
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Vibrance Kit
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <button
                onClick={handleLogout}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                LogOut
              </button>
              <button
                onClick={handleProfile}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Profile {fullName}
              </button>
              
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
