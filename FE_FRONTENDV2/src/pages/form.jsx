import React,{useState,useEffect} from 'react'
import Base from '@/layouts/base'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function  form(){
    
    
    return ( 
        <Base>
           <div className="mx-auto w-full h-full mt-32">
            
            <div className="grid grid-cols-6 mt-8">
           
                <div className="col-start-2 col-span-4 justify-center items-center">
                    <div className="grid md:grid-cols-6   grid-cols-4">
                       <div className="col-start-2 col-span-2">
                       <h1 className="text-base font-bold mt-3 flex flex-col justify-center items-center gap-4">Form list</h1>
                       </div>
                    </div>
                    
                </div>
                   
               
            </div>
            </div>
        </Base>

    )

}

export default form;