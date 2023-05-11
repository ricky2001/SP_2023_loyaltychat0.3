import React, { useEffect,useState } from 'react'
import Base from '@/layouts/base'
import FormConsign from '@/components/FormConsign';
import {useSelector,useDispatch} from 'react-redux'
import {getCoin} from '@/stores/api/index'

function  Consign(){
   const dispatch = useDispatch();
   
    
    // const  [coinUser,setCoinUser] = useState(useSelector(state => state.apiStore.coin))
    useEffect(() => {
        dispatch(getCoin())
    }, [])
    
    
    let coinUser = useSelector(state => state.apiStore.coin)

    

  
    return(
        
        <Base>
                <div className="mx-auto w-full h-full grid md:grid-cols-12  grid-cols-6">
            <div className="md:col-start-4 md:col-span-6 col-start-2 col-span-4">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-lg font-medium">Consign your stars</h1>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                    <h1 className="text-lg font-medium"> Total of stars you can consign : {coinUser}</h1>
                </div>

                <div className="flex flex-col justify-center items-center mt-4">
                <FormConsign  />
                </div>
            </div>



        </div>

        </Base>
    )

}

export default Consign;