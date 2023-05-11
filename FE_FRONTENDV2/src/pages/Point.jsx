import React,{useEffect} from 'react'
import Base from '@/layouts/base'
import CardReward from '@/components/CardReward';
import {Link, useNavigate} from 'react-router-dom'
import {getCoin} from '@/stores/api/index'
import {useSelector,useDispatch} from 'react-redux'
function  Point(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoin())
    }, [dispatch])
    let coinUser = useSelector(state => state.apiStore.coin)
    return ( 
        <Base>
           <div className="mx-auto w-full h-full mt-32">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-black font-bold mb-4">Your stars {coinUser}</h1>
                <Link to={`/consign`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Consign</Link>
            </div>
            <div className="grid grid-cols-6 mt-8">
           
                <div className="col-start-2 col-span-4 justify-center items-center">
                    <div className="grid md:grid-cols-6   grid-cols-4">
                       <div className="col-start-2 col-span-2">
                       <h1 className="text-lg font-bold ">Reward Exchange</h1>
                       </div>
                    </div>
                    <div className="mt-3 flex flex-col justify-center items-center gap-4">
                    
                        <CardReward/>
                        <CardReward/>
                        <CardReward/>
                    </div>
                </div>
                   
               
            </div>
            </div>
        </Base>

    )

}

export default Point;