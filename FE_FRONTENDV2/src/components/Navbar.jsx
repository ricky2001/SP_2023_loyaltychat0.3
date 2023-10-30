import React,{useState} from 'react'
import SlideBar from './SlideBar.jsx'
import {Link} from 'react-router-dom'
import logo from '../assets/img/logo.png'


function Navbar(){
   const [toggle,setToggle] = useState(false);

   function handleToggle(){
      
      setToggle(!toggle);
   }

    return(

<div className="">
<nav className="bg-white border-gray-200 w-full  top-0 fixed  z-40">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to={`/`} className="flex items-center">
        <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Lorem</span> */}
    </Link>
    {/* <button data-collapse-toggle="navbar-default" type="button" classNameName="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span classNameName="sr-only">Open main menu</span>
      <svg classNameName="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button> */}
 
    <div className=" md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col   border  border-gray-100 rounded-lg bg-gray-50  md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
         <li>
         <i className="bi bi-list text-3xl font-bold" onClick={handleToggle}></i>
         
         </li>
      </ul>

    </div>
  </div>
</nav>

      

<SlideBar styleClass={toggle? '':'hidden'}/></div>


    );

}

export default Navbar;