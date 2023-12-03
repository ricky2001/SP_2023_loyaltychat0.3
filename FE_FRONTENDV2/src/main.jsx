import React from 'react'
import ReactDOM from 'react-dom/client'
import 'tw-elements';
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Point from './pages/Point.jsx'
import CalendarPage from './pages/Calendar.jsx'
import Consign from './pages/Consign.jsx'
import Form from './pages/Form.jsx';
import ReportIssue from './pages/ReportIssue.jsx'
import Policy from './pages/Policy.jsx'
import CheckInGraph from './pages/CheckInGraph.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { store } from './stores/config.js'
import { Provider } from 'react-redux'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ProtectedRoute from './routers/protectRouter';
import QRCodeScanner from './components/QRCodeScanner.jsx';

import QRcodegenerator from './pages/QRcodegenerator.jsx';
import Addre from './pages/addre.jsx';
import ExchangeHistory from './components/exchangeHistory.jsx';

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
    element: <ProtectedRoute component={<Dashboard />} />,
  },
  {
    path: "/point",
    element: <ProtectedRoute component={<Point />} />,
  }, 
  {
    path: "/calendar",
    element: <ProtectedRoute component={<CalendarPage />} />,
  },
  {
    path: "Consign",
    element: <ProtectedRoute component={<Consign />} />,
  },
  {
    path: "QRCodeScanner",
    element: <ProtectedRoute component={<QRCodeScanner />} />,
  },
  {
    path: "/form",
    element: <ProtectedRoute component={<Form />} />,
  },
  {
    path: "/reportissue",
    element: <ProtectedRoute component={<ReportIssue />} />,
  },
  {
    path: "/policy",
    element: <ProtectedRoute component={<Policy />} />,
  },
  {
  path:"/QRcodegenerator",
  element:<ProtectedRoute component={<QRcodegenerator/>} />,
  },
  {
  path:"/addre",
  element:<ProtectedRoute component={<Addre/>} />,
},{
  path:"/CheckInGraph",
  element:<ProtectedRoute component={<CheckInGraph/>} />,
},{
  path:"/exchangeHistory",
  element:<ProtectedRoute component={<ExchangeHistory/>} />,
}

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
)