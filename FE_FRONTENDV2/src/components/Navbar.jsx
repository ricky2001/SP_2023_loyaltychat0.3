import React, { useState, useRef, useEffect } from 'react'
import SlideBar from './SlideBar.jsx'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'
// import { NotificationIcon } from 'react-autoql';
// import 'react-autoql/dist/autoql.esm.css'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector, useDispatch } from 'react-redux';
import { auth, logout } from '@/stores/auth/index';


function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}



function Navbar() {
  const dispatch = useDispatch();
    dispatch(auth());
    const isAuthenticated = useSelector(state => state.authStore.isAuth);


    function logoutSystem() {
        dispatch(logout());
    }
    let component;
    if (isAuthenticated) {
        component = <>
        <IconButton aria-label={notificationsLabel(10)}>
              <Badge badgeContent={10} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton></>
      }
  const [toggle, setToggle] = useState(false);
  const slideBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (slideBarRef.current && !slideBarRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [slideBarRef]);

  function handleToggle() {

    setToggle(!toggle);
  }

  return (

    <div className="">
  <nav className="bg-white border-gray-200 w-full top-0 fixed z-40">
    <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <Link to={`/dashboard`} className="flex items-center">
        <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
      </Link>

      <div className="flex items-center">
        {component}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col border border-gray-100 rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <i className="bi bi-list text-3xl font-bold" onClick={handleToggle}></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>



  <div ref={slideBarRef}>
        <SlideBar styleClass={toggle ? '' : 'hidden'} />
      </div>
</div>


  );

}

export default Navbar;