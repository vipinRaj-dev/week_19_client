import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const [cookies, setCookie, removeCookie] =  useCookies(['User'])
 


  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
           withCredentials: true 
        });
        
        setUser(response.data);
      } catch (error) {
        if(error.response.data.message === 'user not found'){
          removeCookie('User')
          return navigate('/')
        }
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
      navigate('/user/login')
      return null
  }


  return (
    <div>
      <Header/>
      <div className="h-screen">
        <div class="bg-cover bg-center"> <img className="w-screen h-screen" src="https://cdn.dribbble.com/userupload/11401301/file/original-c038c837389b92c4a5f910a8cb1b245e.png?resize=1504x1128" alt="" /> </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;

