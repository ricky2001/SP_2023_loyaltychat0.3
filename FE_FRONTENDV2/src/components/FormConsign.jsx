import React,{useState,useEffect}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useConsign} from '@/stores/api/index'
import {setEmail} from '@/stores/auth/index'
import {useNavigate} from 'react-router-dom'
import classNames from 'classnames';
import '@/assets/css/popup.css'




function FormConsign(){
    const [emailTarget,setEmailTarget] = useState('');
    const [pointSender,setPointSender] = useState('');
    const [toggle,setToggle] = useState(false);
    const [text ,setText] = useState('');
    const navigate = useNavigate();
    const email = useSelector(state => state.authStore.email);
    const [emailUser,setEmailUser] = useState();

    const popupShow  = classNames('fixed  top-0  left-0  right-0 bottom-0 flex flex-row justify-center items-center bg-black bg-opacity-30 z-50',{
        'hidden':!toggle,
    });

    
    const dispatch = useDispatch();
    useEffect(() => {   
        dispatch(setEmail())
        
        
    }, [dispatch])

   useEffect(() => {
    setEmailUser(email)
   }, [email])
    
    
    const handleToggle = ()=>{
        setToggle(!toggle);
    }

    useEffect(() => {
        if(toggle){
            
        }
        else{

        }
    }, [toggle])
   
    
    const handleChangeEmailTarget = (e)=>{

        setEmailTarget(e.target.value);
    }
    const handleChangePointSender = (e)=>{
        setPointSender(e.target.value);
    }
    
    const handleChangeText = (e)=>{
        setText(e.target.value);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(emailTarget,pointSender,text);
        
        await dispatch(useConsign({emailFrom:emailUser,emailTo:emailTarget,starConsign:pointSender,text:text}));
        
        navigate('/point');
    }

    return(
        <form className="w-full h-screen" >

            <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                    <input type="text" id="disabled-input"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={emailUser} disabled/>
            </div>

            <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"  onChange={handleChangeEmailTarget}/>
            </div>
            <div className="mb-4">
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Point</label>
                <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChangePointSender}/>
            </div>
            <div className="mb-4">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text</label>
                <textarea id="message" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={handleChangeText}></textarea>
            </div>

           <div className="flex flex-row justify-center items-center">


           
            <button  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={handleToggle}>
            Submit
            </button>
           
            <div   tabIndex="-1" className={popupShow}>
               <div className="relative w-full max-w-md max-h-full">
                   <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                       <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={handleToggle}>
                           <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" ></path></svg>
                           <span className="sr-only">Close modal</span>
                       </button>
                       <div className="p-6 text-center">
                           <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                           <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you Sure to  Consign?</h3>
                           <button  type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleSubmit}>
                               Yes, I'm sure
                           </button>
                           <button  type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleToggle}>No, cancel</button>
                       </div>
                   </div>
               </div>
           </div>

            
          
         

           </div>

        </form>


    )

}





export default FormConsign;