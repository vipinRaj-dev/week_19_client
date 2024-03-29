import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AdminfetchData } from "../redux/Reducers/AdminSlice";
import axios from "axios";

const AdminUserEditPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);

  const { userId } = useParams(); // Assuming you have the userId from the URL

  useEffect(() => {
    dispatch(AdminfetchData());
  }, [dispatch]);

  const adminData = useSelector((state) => state.Admin);
  const user = adminData.find((user) => user._id === userId) || {};

  const [updatedData, setUpdatedData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    picturePath: user.picturePath,
  });

  useEffect(() => {
    setUpdatedData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      picturePath: user.picturePath,
    });
  }, [user]);

  const validateImage = (file) => {
    // Define allowed file types
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp "];

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
      setStatus("Invalid file type");
      return false;
    }

    return true;
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file && !validateImage(file)) {
      return; // Stop submission if image validation fails
    }

    try {
      const formData = new FormData();
      formData.append("firstname", updatedData.firstname);
      formData.append("lastname", updatedData.lastname);
      formData.append("email", updatedData.email);
      formData.append("picturePath", file);

      const response = await axios.post(
        `http://localhost:3001/admin/profile/edit/${userId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Updating successful", response.data);
        setStatus("Updated successfully");
      } else {
        console.log("Updating failed");
        setStatus("Updating failed");
      }
      const delay = 2000;
    // Use setTimeout to delay the redirect
    setTimeout(() => {
      navigate('/admin/dashboard');
    }, delay);
    } catch (error) {
      console.error("Error updating profile", error);
      setStatus("Server error");
    }
  };

  return (
    <div>
      <div class="sm:mx-32 lg:mx-32 xl:mx-72">
        <div class="flex justify-between container mx-auto">
          <div class="w-full">
            <div class="mt-4 px-4">
              <h1 class="text-3xl font-semibold py-7 px-5">Edit Profile</h1>
              <h1 class="font-thinner flex text-4xl pt-10 px-5">{status}</h1>
              <form onSubmit={handleSubmit} class="mx-5 my-5">
                <label class="relative block p-3 border-2 border-black rounded" htmlFor="name">
                  <span class="text-md font-semibold text-zinc-900" htmlFor="name">
                    First Name
                  </span>
                  <input
                    class="w-full bg-transparent p-0 text-sm text-gray-500 focus:outline-none"
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={updatedData.firstname}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </label>
                <label class="relative block p-3 border-2 mt-2 border-black rounded" htmlFor="name">
                  <span class="text-md font-semibold text-zinc-900" htmlFor="name">
                    Lastname
                  </span>
                  <input
                    class="w-full bg-transparent p-0 text-sm text-gray-500 focus:outline-none"
                    id="name"
                    name="lastname"
                    type="text"
                    value={updatedData.lastname}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </label>
                <div class="mt-5">
                  <label class="input-field inline-flex items-baseline border-2 border-black rounded p-4">
                    <span class="flex-none text-dusty-blue-darker select-none leading-none">Email :</span>
                    <div class="flex-1 leading-none">
                      <input
                        id="handle"
                        type="text"
                        class="w-full pl-1 bg-transparent focus:outline-none"
                        name="email"
                        value={updatedData.email}
                        onChange={handleChange}
                        placeholder="@email.com"
                      />
                    </div>
                  </label>
                </div>

                <img src={`http://localhost:3001/${user.picturePath}`} alt="" className="w-36 mt-5 rounded-full" />

                <label class="block pt-2">
                  <p>Choose profile photo</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    class="w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-pink-300 file:text-zinc-900
                      hover:file:bg-rose-300"
                  />
                </label>

                <div className="flex justify-center mt-9">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEditPage;
