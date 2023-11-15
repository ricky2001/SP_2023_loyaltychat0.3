import React,{useState,useEffect} from 'react'
import Base from '@/layouts/base'
import CardReward from '@/components/CardReward';
import {Link, useNavigate} from 'react-router-dom'
import {getCoin,getName} from '@/stores/api/index'
import {useSelector,useDispatch} from 'react-redux'


function  Point(){
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getCoin()), dispatch(getName())
    // }, [dispatch])
    // let coinUser = useSelector(state => state.apiStore.coin)
    // let nameUser = useSelector(state => state.apiStore.names)

    const dispatch = useDispatch();

    // Fetch initial data on component mount
    useEffect(() => {
      dispatch(getCoin());
      dispatch(getName());
    }, [dispatch]);
  
    // Fetch real-time data at a regular interval
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(getCoin());
        dispatch(getName());
      }, 5000); // Fetch data every 10 seconds (adjust the interval as needed)
  
      // Clear the interval when the component is unmounted or the dependencies change
      return () => clearInterval(interval);
    }, [dispatch]);
  
    // Retrieve data from the Redux store
    const coinUser = useSelector(state => state.apiStore.coin);
    const nameUser = useSelector(state => state.apiStore.names);
  
    
    return ( 
        <Base>
           <div className="mx-auto w-full h-full mt-32">
            <div className="flex flex-col justify-center items-center">
            <h1 className="text-black font-bold mb-4">Name :  {nameUser}</h1>
                <h1 className="text-black font-bold mb-4">Your stars {coinUser}</h1>
                <Link to={`/consign`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Consign</Link>
            </div>
            <div className="grid grid-cols-6 mt-8">
           
                <div className="col-start-2 col-span-4 justify-center items-center">
                    <div className="grid md:grid-cols-6   grid-cols-4">
                       <div className="col-start-2 col-span-2">
                       {/* <h1 className="text-lg font-bold ">Reward Exchange</h1> */}
                       <h1 className="text-base font-bold mt-3 flex flex-col justify-center items-center gap-4">Reward Exchange</h1>
                       </div>
                    </div>
                    <div className="mt-3 flex flex-col justify-center items-center gap-4">
                    
                        <CardReward/>

                    </div>
                </div>
                   
               
            </div>
            </div>
        </Base>

    )

}

export default Point;