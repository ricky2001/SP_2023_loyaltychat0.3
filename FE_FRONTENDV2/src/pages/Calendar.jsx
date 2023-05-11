import React,{useState,useEffect} from 'react'
import EmployeeCalendar from '@/components/EmployeeCalendar.jsx';
import Base from '@/layouts/base.jsx'
import moment from 'moment';
import  {useDispatch,useSelector} from 'react-redux'
import {getHistory,checkIn} from '@/stores/api/index'
import classNames from 'classnames';



function CalendarPage() {
    const dispatch = useDispatch();
    const [showDate, setShowDate] = useState([]);
    const [disableButton, setDisableButton] = useState(false);
    const [toggle,setToggle] = useState(false);
    let history = useSelector(state => state.apiStore.date)
    const [star,setStar] = useState();
    const [maxCount,setMaxCount] = useState();

    const popupShow  = classNames('fixed  top-0  left-0  right-0 bottom-0 flex flex-row justify-center items-center bg-black bg-opacity-30 z-50',{
        'hidden':!toggle,
    });
   

    const buttonStyleDisable = classNames(' text-white font-bold py-2 px-4 rounded-xl',{
        'bg-blue-500 hover:bg-blue-700':!disableButton,
        'bg-slate-400 hover:bg-slate-700':disableButton,
    })


    useEffect(() => { 
        dispatch(getHistory())
        setToggle(false)
      
       
     }   , [dispatch])

     useEffect(() => {  
        setShowDate(history);
        const day = moment();
        const dayOfWeek = day.day();


        

        const deleteOneday = day.subtract(1, 'days');
        if(dayOfWeek === 0 || dayOfWeek === 6){
            setDisableButton(true)

        }else{
            if(history.includes(deleteOneday.format('YYYY-MM-DD'))){
                setDisableButton(true)
            }else{
                setDisableButton(false)
            }
        }
        
        setMaxCount(countConsecutiveDays(history))
        if(Math.pow(2,maxCount-1)<=1){
            setStar(1)
        }else{
            setStar(Math.pow(2,maxCount-1))
        }
      
        }   , [history])


        const handleToggle = ()=>{
            setToggle(!toggle);
        }





       

 async function handleClickCheckin(){
        let dateCheckIn = moment().format('YYYY-MM-DD')
        console.log(dateCheckIn)
        await dispatch(checkIn({dateCheckIn,star}))
        await dispatch(getHistory())
        // setShowDate(history);
        setToggle(false)
        
     }
    
function countConsecutiveDays(array) {
// console.log("old",array)
let dates = [...array]
// Sort the array of dates in ascending order
dates = dates.sort((a, b) => moment(a) - moment(b));
// console.log('new',dates)

let maxCount = 0;


const nowDay = moment();
const deleteOneday = nowDay.subtract(2, 'days');

if(dates.includes(deleteOneday.format('YYYY-MM-DD'))){
    for (let i = dates.length-1; i >=0;i-- ){
        if(i -1 <0){
            
            break;
        }
        console.log(dates[i],dates[i-1])

        const diff = moment(dates[i]).diff(moment(dates[i-1]), 'days');
        console.log(diff)
        if (diff === 1) {
            maxCount++;
        }
        if(diff !== 1){
            
            break;
        }
        

    }
    maxCount +=1;

}
// let rate = Math.pow(2,maxCount-1);
// // 5 
// // calulate star
// if(rate <=0){
//     rate = 1
// }






return maxCount;
}
     
    

    return (
        <Base>
        <div className="w-full h-screen">
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mb-4 ">
                    <h1 className="text-xl  mb-4">Check-in</h1>
               <div className="flex flex-row  justify-center items-center ">
                   
                   <h1 className="text-xl mr-6">Check-in for event:</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Click</button>
                   
               </div>
       
                
            </div>
            
            <div  className='flex flex-col justify-start'>
            <h1 className="text-xl mr-6 mb-4">Check-in for daily</h1>  
            <EmployeeCalendar markedDates={history } />
            </div>

            <div className="h-96 flex flex-col justify-center items-center">
            <button className={buttonStyleDisable} onClick={ handleToggle} disabled={disableButton}>Click-in-today</button>
            </div>
             </div>

             <div   tabIndex="-1" className={popupShow}>
               <div className="relative w-full max-w-md max-h-full">
                   <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                       <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={handleToggle}>
                           <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" ></path></svg>
                           <span className="sr-only">Close modal</span>
                       </button>
                       <div className="p-6 text-center">
                            <svg aria-hidden="true" class="mx-auto w-40 h-40 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                           {/* <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                           <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Stack {maxCount} and Star {star}</h3>
                           <button  type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleClickCheckin}>
                               Yes, I'm sure
                           </button>
                       </div>
                   </div>
               </div>
           </div>
        


        </div>
        </Base>


    )

}

export default CalendarPage;