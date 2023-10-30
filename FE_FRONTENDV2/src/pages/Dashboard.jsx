import React from 'react'
import Base from '@/layouts/base'
import Carousel from '@/components/CarouselDashboard';
import Recent from '@/components/Recents';
import Describtions from '@/components/Describtions';
import Newsfeed from '@/components/Newsfeed';
import ChatBox from '../components/ChatBox/Chatbox';

function Dashboard() {
    return (

        <Base>
            <div className='h-full w-full '>
                <div className="flex flex-col justify-center items-center">
                    <Carousel />
                    <Recent/>
                    {/* <Newsfeed /> */}
                    {/* <Describtions /> */}
                    {/* <ChatBox /> */}
                </div>
            </div>
        </Base>

    )
}

export default Dashboard;