import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/Reducers/UserSlice";
import axios from "axios";

const EditProfile = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const userData = useSelector((state) => state.User);
  const { firstname, lastname, email, picturePath } = userData;
  // console.log('this si the picture path');
  // console.log(picturePath);

  const [updatedData, setUpdatedData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    picturePath: picturePath,
  });

  useEffect(() => {
    setUpdatedData({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      picturePath: userData.picturePath,
    });
  }, [userData]);

  const validateImage = (file) => {
    // Define allowed file types
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp , image/avif"];

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      console.error(
        "Invalid file type. Please upload a JPEG, PNG, or GIF image."
      );
      setStatus("Invalid file type");
      return false;
    }

    return true;
  };

  // useEffect(() => {
  //   setUpdatedData((prev) => ({
  //     ...prev,
  //     picturePath: file,
  //   }));
  // }, [file]);

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

      // console.log(updatedData);
      const response = await axios.post(
        "http://localhost:3001/user/profile/edit",
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
    } catch (error) {
      console.error("Error updating profile", error);
      setStatus("Server error");
    }
  };
  return (
    <div>
      <div
        // style="background-color : #f4f4f0"
        className=" sm:mx-32 lg:mx-32 xl:mx-72 "
      >
        <div className="flex justify-between container mx-auto">
          <div className="w-full">
            <div className="mt-4 px-4">
              <h1 className="text-3xl font-semibold py-7 px-5">Edit Profile</h1>
              <h1 className="font-thinner flex text-4xl pt-10 px-5">{status}</h1>
              <form onSubmit={handleSubmit} className="mx-5 my-5">
                <label
                  className="relative block p-3 border-2 border-black rounded"
                  htmlFor="name"
                >
                  <span
                    className="text-md font-semibold text-zinc-900"
                    htmlFor="name"
                  >
                    Firstname
                  </span>
                  <input
                    className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none"
                    id="firstname"
                    name="firstname"
                    value={updatedData.firstname}
                    type="text"
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </label>
                <label
                  className="relative block p-3 border-2 mt-2 border-black rounded"
                  htmlFor="name"
                >
                  <span
                    className="text-md font-semibold text-zinc-900"
                    htmlFor="name"
                  >
                    Lastname
                  </span>
                  <input
                    className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none"
                    id="name"
                    name="lastname"
                    value={updatedData.lastname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your name"
                  />
                </label>
                <div className="mt-5">
                  <label className="input-field inline-flex items-baseline border-2 border-black rounded  p-4">
                    <span className="flex-none text-dusty-blue-darker select-none leading-none">
                      Email :
                    </span>
                    <div className="flex-1 leading-none">
                      <input
                        id="handle"
                        type="text"
                        value={updatedData.email}
                        onChange={handleChange}
                        className="w-full pl-1 bg-transparent focus:outline-none"
                        name="email"
                        placeholder="@email.com"
                      />
                    </div>
                  </label>
                </div>

                <img
                  src={`http://localhost:3001/${userData.picturePath}`}
                  alt=""
                  className=" w-36 mt-5 rounded-full"
                />

                <label className="block pt-2">
                  <p>Choose profile photo</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-pink-300 file:text-zinc-900
      hover:file:bg-rose-300
    "
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
    // </div>
  );
};

export default EditProfile;
