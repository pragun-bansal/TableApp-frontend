import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import {AiFillDelete} from 'react-icons/ai'
import axios from "axios";
import IndexPage from "../IndexPage";
export default function Sidebar({}) {




  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const createTable = async () => {
    //write a post request to create table with name NEW TABLE in route /api/savetable
    const res = await fetch("/api/savetable", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "NEW TABLE" }),
        });
        const data = await res.json();
        console.log(data);  

 };
 


  

  return (
    <div >
      
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className={`inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg 2xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 `}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-1/4 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } 2xl:translate-x-0`}
        aria-label="Sidebar"
      >  

        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
      <ul class="space-y-2 font-medium">
      <li>
            <a  class="flex items-center p-2 ml-4 text-gray-900 rounded-lge  group" href="/">
               <svg class="w-5 h-5 text-gray-500 transition duration-75  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span class="ml-3">Home Page</span>
            </a>
            <button onClick={toggleSidebar} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Close menu</span>
    </button>
         </li>
         {/* <li><img className="w-[50%] rounded-full " src={user.pfp} alt="pfp image" /></li> */}
         
         <IndexPage />
         
      </ul>
   </div>
      </aside>
    </div>
  );
}