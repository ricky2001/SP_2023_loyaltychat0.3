import React from 'react'
import PropType from 'prop-types'

function Post ({imageURL,profileURL}){

    return(
        <div className="mb-6">
          
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      
            <div className="flex items-center p-4">
                <div>
                    <img alt="" className="w-10 h-10 rounded-full" src={profileURL}>
                    </img>
                </div>
                <div className="ml-4">
                    <h5>
                    email@windster.com
                    </h5>
    
                </div>
                
                </div>
                <div className="border flex flex-col justify-center items-center mb-4">
                        <img alt="" src={imageURL}/>
                </div>
                
            <textarea id="comment" rows="2"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
            <div className=" grid grid-cols-2 w-full h-12 border border-gray-200 ">
                <div className="flex justify-center items-center border border-gray-200">
                    <i class="bi bi-hand-thumbs-up"></i>
                </div>
                <div className="flex justify-center items-center border border-gray-200">
                    <i class="bi bi-chat-left"></i>
                </div>

            </div>
        </div>

    </div>


    )

}

Post.propTypes = {
    imageURL: PropType.string.isRequired,
    profileURL: PropType.string.isRequired
}
export default Post;