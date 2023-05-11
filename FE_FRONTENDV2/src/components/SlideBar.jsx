import React from 'react'
import PropType from 'prop-types'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux' 
import {auth,logout} from '@/stores/auth/index'


function SlideBar({styleClass}){
        
        const dispatch = useDispatch();
        dispatch(auth());
        const isAuthenticated  = useSelector(state => state.authStore.isAuth);
  
  
        function logoutSystem(){
            dispatch(logout());
        }


        let  component;
        if(isAuthenticated){
            component = <>          
        <li>
            <Link to={`/dashboard`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ">
            <i className="bi bi-newspaper text-gray-700 font-bold text-xl"></i>
            <span className="ml-3">News feed</span>
            </Link>
        </li>
        <li>
            <Link to={`/point`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="bi bi-star-fill text-gray-700 font-bold text-xl"></i>
            <span className="flex-1 ml-3 whitespace-nowrap">Reward & stars point</span>
            
            </Link>
        </li>
        <li>
            <Link to={`/calendar`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="bi bi-calendar-check text-gray-700 font-bold text-xl"></i>
            <span className="flex-1 ml-3 whitespace-nowrap">Check-in</span>
           
            </Link>
        </li>
        <li>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="bi bi-card-checklist text-gray-700 font-bold text-xl"></i>
            <span className="flex-1 ml-3 whitespace-nowrap">Form</span>
            </a>
        </li>
        <li>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="bi bi-clipboard-data-fill text-gray-700 font-bold text-xl"></i>

            <span className="flex-1 ml-3 whitespace-nowrap">Employee Report</span>
            </a>
        </li>
        <li>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="bi bi-exclamation-octagon-fill text-gray-700 font-bold text-xl"></i>
            <span className="flex-1 ml-3 whitespace-nowrap">Report issues</span>
            </a>
        </li>
        <li>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="bi bi-shield-fill-check text-gray-700 font-bold text-xl"></i>
            <span className="flex-1 ml-3 whitespace-nowrap">Privacy Policy</span>
            </a>
        </li>
        <li className="fixed bottom-0" onClick={logoutSystem}>
            <Link to={`/`}   className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="bi bi-door-closed-fill text-gray-700 font-bold text-xl"></i>
            <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </Link>
        </li>
        </> 

        }else{
            component=<>
                 <li>
                     <Link to={`/`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"> 
                     <i className="bi bi-house text-gray-700 font-bold text-xl"></i>
                    <span className="ml-3">Home</span></Link>
                   
                   
                  
                </li>
                <li>
                    <Link to={`/login`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-door-closed-fill text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Login</span>
                    </Link>

                   
                </li>
            </>
        }

    return(
        <>

        <aside className={`fixed top-12  right-0  w-72  ${styleClass} z-50`} aria-label="Sidebar">
        <div className="px-3 py-4 overflow-y-auto  overflow-x-hidden rounded bg-gray-50 h-screen dark:bg-gray-800">
            <ul className="space-y-2">
             
                {component}

           
            </ul>
        </div>
        </aside>

        </>
    );
}

SlideBar.propTypes ={
    styleClass: PropType.string,
}





export default SlideBar;