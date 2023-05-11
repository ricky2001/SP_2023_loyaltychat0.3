import React from 'react'
import ReactDOM from 'react-dom/client'
import 'tw-elements';
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Point from './pages/Point.jsx'
import CalendarPage from './pages/Calendar.jsx'
import Consign from './pages/Consign.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { store } from './stores/config.js'
import { Provider } from 'react-redux'
import 'bootstrap-icons/font/bootstrap-icons.css'

import  ProtectedRoute from './routers/protectRouter';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute component={<Dashboard/>} />,
  },
  {
    path: "/point",
    element: <ProtectedRoute component={<Point/>} />,
  },{
    path: "/calendar",
    element: <ProtectedRoute component={<CalendarPage/>} />,
  },
  {
    path:"Consign",
    element:<ProtectedRoute component={<Consign/>} />,
  }

]);


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard/>,
//   },
//   {
//     path: "/point",
//     element: <Point/>,
//   },{
//     path: "/calendar",
//     element: <CalendarPage/>,
//   },
//   {
//     path:"Consign",
//     element:<Consign/>,
//   }

// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
   
    <RouterProvider router={router} />
    </Provider>
   
  </React.StrictMode>
)
