import React from 'react'
import Base from '@/layouts/base'
import Carousel from '@/components/CarouselDashboard';
import  Recent from '@/components/Recents';
import Describtions from '@/components/Describtions';

function Dashboard(){
    return(
        
           <Base>
            <div className='h-full w-full '>
                <div className="flex flex-col justify-center items-center">
                    <Carousel/>
                    {/* <Recent/> */}
                    <Describtions/>
                </div>
            </div>
           </Base>
        
    )
}

export default Dashboard;