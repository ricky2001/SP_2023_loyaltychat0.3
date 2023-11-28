import React from "react";
import { useState, useEffect } from "react";
import Base from '@/layouts/base.jsx'
import Chart from "react-apexcharts";
import axiosInstance from '../utils/api/axiosIntance.js';


function CheckInGraph() {
    const [graphData, setGraphData] = useState({
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "Morning",
          data: []
        },
        {
          name: "Afternoon",
          data: []
        }
      ]
    });
    
      useEffect(() => {
        // Fetch data from the backend API
        axiosInstance.get("api/checkgraph")
          .then(response => {
            // Process the data from the backend and update the state
            const formattedData = response.data.map(item => ({
              date: item.date,
              morning: {
                emails: item.morning.emails,
                count: item.morning.count
              },
              afternoon: {
                emails: item.afternoon.emails,
                count: item.afternoon.count
              }
            }));
    
            const categories = formattedData.map(item => item.date);
            const morningData = formattedData.map(item => item.morning.count);
            const afternoonData = formattedData.map(item => item.afternoon.count);
    
            setGraphData({
              options: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: categories
                }
              },
              series: [
                {
                  name: "Morning",
                  data: morningData
                },
                {
                  name: "Afternoon",
                  data: afternoonData
                }
              ]
            });
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }, []);
      const getHeight = () => {
        return window.innerWidth <= 768 ? 300 : 400;
      };
  
  
  
  return (
    <Base>
      <div className="mx-auto w-full h-full mt-32">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-bold mb-4">Current Date: {new Date().toDateString()}</p>
        </div>
        <center>
        <div className="col">
          <Chart
            options={graphData.options}
            series={graphData.series}
            type="bar"
            width="95%"
            height={getHeight()}
          />
        </div></center>
      </div>
    </Base>





  )
}
export default CheckInGraph;
