import React from 'react'
import {LogOut,X} from 'lucide-react';
 import profile from "../../public/user.png"
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import axios from "axios"; 

function  Sidebar() {
  
     const user= JSON.parse(localStorage.getItem("user"));
     console.log(user);
     const [, setAuthUser]=useAuth()
     const navigate=useNavigate()
  const handleLogout=async()=>{

    try {
      const response=await axios.get("http://localhost:4002/api/v1/user/logout",{
      withCredentials:true
    })
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    alert(response.data.message)
    setAuthUser(null)
    navigate("/login")
  }
     catch (error) {
   alert   (error?.response?.data?.errors || "Logout Failed")
    }
  };

  return (
  
    <div className='h-full flex flex-col bg-[#232327]'>
      {/*Header*/}
      <div className='p-4 border-b border-gray-700 flex items-center justify-between'>
        <div className='text-xl font-bold text-white'>Terminus</div>
        <button>
          <X className='text-gray-300 w-6 h-6'/>
        </button>
      </div>

      {/*History*/}
      <div className='flex-1 overflow-y-auto px-4 py-3 space-y-2'> 
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4">
          + New Chat

        </button>

        <div className='text-gray-500'>No chat history yet</div>
      </div>

      {/*Footer*/}
      <div className='p-4 border-t border-gray-700'>
        <div className='flex flex-col gap-3'> 
          <div className='flex items-center gap-2 cursor-pointer'>
            <img className='rounded-full w-8 h-8' src={profile} alt="" />
            <span className='text-gray-300'>{user?user.firstName:"My Profile"}</span>
          </div>
          <button onClick={handleLogout} className='flex items-center text-sm gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300'  ><LogOut className=""/>Logout</button>
        </div>
      </div>
      
      
      
      
       </div>
  )
  
}

export default Sidebar;