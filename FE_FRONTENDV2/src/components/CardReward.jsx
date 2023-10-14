import React,{useState,useEffect} from 'react'
import '@/assets/css/counter.css'
import {useSelector,useDispatch} from 'react-redux'
import {getItem} from '@/stores/api/index'

function CardReward(){
    const [item,setitem] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fectchdata = dispatch(getItem())
        console.log(fectchdata);
        // setitem(fectchdata)
    }, [dispatch])
    // let item = useSelector(state => state.apiStore.data);
    // useEffect(() => {
    //     setitem(getItem())
    // }, [setitem])
    

    return(
<div>
    {item.map((data,index)=>{
        return(
            <a  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={data.itemimg} alt=""/>
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.itemname}
            <span class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300 ml-4">{data.itemprice} stars</span>
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">This pencils make with high material and buitifull design.
            </p><input type="text" id="disabled-input"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
    
            
            <div className="flex flex-row justify-between items-center">
                <div class="custom-number-input h-10 w-32">
                    
                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                        <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 " name="custom-input-number" value="0"></input>
                    <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                        <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                    </div>
    
                
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Exchange</button>
            </div>
        </div>   
    </a>
        )
        
    })}

</div>
    )

}

export  default CardReward;
