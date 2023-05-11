import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Base({children}){
    
        return(
            <>
            <Navbar/>
            <div className="w-full h-full mt-16 mb-32 ">
            {children}
            </div>
            <Footer/>
            </>
        )
}

export default Base;
