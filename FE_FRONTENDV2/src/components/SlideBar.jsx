import React from 'react';
import PropType from 'prop-types';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { auth, logout } from '@/stores/auth/index';
import './SlideBar.css';



function SlideBar({ styleClass }) {

    const dispatch = useDispatch();
    dispatch(auth());
    const isAuthenticated = useSelector(state => state.authStore.isAuth);


    function logoutSystem() {
        dispatch(logout());
    }


    let component;
    if (isAuthenticated) {
        component = <>
            <li>
                <Link to={`/dashboard`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ">
                    <i className="bi bi-postcard-heart-fill text-gray-700 font-bold text-xl"></i>
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
                <Link to={`/YouReward`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-gift text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">My Reward</span>

                </Link>
            </li>
            
            <li>
                <Link to={`/exchangeHistory`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-box2-heart text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Exchange Orders</span>

                </Link>
            </li>

            <li>
                <Link to={`/calendar`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-calendar-check-fill text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Check-in</span>

                </Link>
            </li>
            <li>
                <Link to={'/form'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-building-check text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Form</span>
                </Link>
            </li>
            <li>
                <Link to={'/CheckInGraph'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-clipboard-data-fill text-gray-700 font-bold text-xl"></i>

                    <span className="flex-1 ml-3 whitespace-nowrap">Employee Graph</span>
                </Link>
            </li>
            <li>
                <Link to={'/reportissue'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-exclamation-octagon-fill text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Report issues</span>
                </Link>
            </li>
            <li>
                <Link to={'/policy'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-shield-fill-check text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Privacy Policy</span>
                </Link>
            </li>
            <li className="fixed bottom-0" onClick={logoutSystem}>
                <Link to={`/`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="bi bi-door-closed-fill text-gray-700 font-bold text-xl"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </Link>
            </li>
        </>

    } else {
        component = <>
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

    return (
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

SlideBar.propTypes = {
    styleClass: PropType.string,
}





export default SlideBar;



