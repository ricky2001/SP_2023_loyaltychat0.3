import React, { useState, useEffect } from 'react';
import Base from '@/layouts/base';
import CardReward from '@/components/CardReward';
import { Link, useNavigate } from 'react-router-dom';
import { getCoin, getName } from '@/stores/api/index';
import { useSelector, useDispatch } from 'react-redux';
import '../components/Point.css';

function Point() {
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Initial fetch
    dispatch(getCoin());
    dispatch(getName());

    // Set up interval to continuously update coin data
    const id = setInterval(() => {
      dispatch(getCoin());
    }, 3000); // Update every 5 seconds, adjust as needed

    setIntervalId(id);

    return () => {
      // Clean up the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const coinUser = useSelector((state) => state.apiStore.coin);
  const nameUser = useSelector((state) => state.apiStore.names);

  return (
    <Base>
      <div className="mx-auto w-full h-full mt-32">
        <div className="text flex flex-col justify-center items-center">
          <h1 className="text-black font-bold mb-4">Name :  {nameUser}</h1>
          <h1 className="text-black font-bold mb-4">Your stars {coinUser}</h1>
          <Link to={`/consign`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Consign</Link>
        </div>
        <div className="grid grid-cols-6 mt-8">

          <div className="col-start-2 col-span-4 justify-center items-center">
            <div className="grid md:grid-cols-6   grid-cols-4">
              <div className="text col-start-2 col-span-2">
                {/* <h1 className="text-lg font-bold ">Reward Exchange</h1> */}
                <h2 className="text-base font-bold mt-3 flex flex-col justify-center items-center gap-4">Reward Exchange</h2>
              </div>

            </div><br/>
            <div className="flex flex-col justify-center items-center">
              <Link to={`/addre`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Add Reward</Link>
            </div>



            <div className="mt-3 flex flex-col justify-center items-center gap-8">

              <CardReward />

            </div>
          </div>


        </div>
      </div>
    </Base>

  )

}

export default Point;