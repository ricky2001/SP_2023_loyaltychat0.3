import React, { useEffect, useState } from 'react';
import Base from '@/layouts/base.jsx';
import axiosInstance from '../utils/api/axiosIntance.js';
import Swal from 'sweetalert2';
import './ExchangeHistory.css';

function ExchangeHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchExchangeHistory();
  }, []);

  const fetchExchangeHistory = async () => {
    try {
      const response = await axiosInstance.get("/api/exchangehistory");
      const data = response.data.map(entry => ({
        ...entry,
        id: entry.id || entry.docId // Use 'id' or 'docId' depending on the API response
      }));
      setHistory(data);
    } catch (error) {
      // console.error("Error fetching exchange history:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axiosInstance.post(`api/updateStatus`, { id, newStatus });
      Swal.fire({
        title: "Status Updated",
        text: "The status has been successfully updated.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      fetchExchangeHistory(); // Refresh the exchange history after status update
    } catch (error) {
      // console.error("Error updating status:", error);
    }
  };

  const incompleteHistory = history.filter(entry => entry.status !== "Complete");
  const completeHistory = history.filter(entry => entry.status === "Complete")
                                    .map(entry => ({...entry, id: entry.id || entry.docId}));

  return (
    <Base>
      <div className="exchange-history">
        <h1>Exchange Orders</h1>
        <div className="table-container">
          <table className="exchange-history-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Date</th>
                <th>Department</th>
                <th>Item Name</th>
                <th>Item Total</th>
                <th>Image</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {incompleteHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.email}</td>
                  <td>{entry.name}</td>
                  <td>{entry.date}</td>
                  <td>{entry.department}</td>
                  <td>{entry.itemname}</td>
                  <td>{entry.itemtotal}</td>
                  <td><img src={entry.img} alt="Item" className="item-image" /></td>
                  <td>
                    <select
                      value={entry.status}
                      onChange={(e) => updateStatus(entry.id, e.target.value)}
                    >
                      <option value="Waiting for HR">Waiting for HR</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><br/><br/><br/>
        
        <h1>Complete Exchange History</h1>
        <div className="table-container">
          <table className="exchange-history-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Date</th>
                <th>Department</th>
                <th>Item Name</th>
                <th>Item Total</th>
                <th>Image</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {completeHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.email}</td>
                  <td>{entry.name}</td>
                  <td>{entry.date}</td>
                  <td>{entry.department}</td>
                  <td>{entry.itemname}</td>
                  <td>{entry.itemtotal}</td>
                  <td><img src={entry.img} alt="Item" className="item-image" /></td>
                  <td>{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  );
}

export default ExchangeHistory;