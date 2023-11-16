import React, { useState, useEffect } from 'react';
import '@/assets/css/counter.css';
import { useSelector, useDispatch } from 'react-redux';
import { useExchange } from '@/stores/api/index';
import { setEmail } from '@/stores/auth/index'
import axiosInstance from '../utils/api/axiosIntance.js';


function CardReward() {
  const [item, setItem] = useState([]); // Use setItem to update the item state
  const dispatch = useDispatch();
  const email = useSelector(state => state.authStore.email);
  const [emailUser, setEmailUser] = useState();
  const [itemtotal, setItemTotal] = useState('');
  const [itemId, setItemId] = useState('');
  // const items = useSelector(state => state.apistStore.data); 

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setEmail())


  // }, [dispatch])

  // useEffect(() => {
  //   setEmailUser(email)
  // }, [email])

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/getUserItemExchange').then(response => {
  //     setItem(response.data);
  //     console.log(item);

  //   })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
const fetchData = async () => {
    try {
      const response = await  axiosInstance.get('api/getUserItemExchange');
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    dispatch(setEmail());
  }, [dispatch]);

  useEffect(() => {
    setEmailUser(email);
  }, [email]);

  useEffect(() => {
    fetchData(); // Fetch initial data

    const interval = setInterval(() => {
      fetchData(); // Fetch updated data every, for example, 10 seconds
    }, 5000); // 10000 milliseconds = 10 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component is unmounted or the dependencies change
    };
  }, []);

  const handleChangeItemTotal = (e) => {
    setItemTotal(e.target.value);
  }
  const handleClickExchage = async (e , itemId) => {
    e.preventDefault();

    // setItemId(itemId);

    // dispatch(useExchange({ emailuser: emailUser, itemid: itemId, itemTotal: itemtotal }));

     // Perform the exchange operation
     dispatch(useExchange({ emailuser: emailUser, itemid: itemId, itemTotal: itemtotal }))
     .then(() => {
       // Fetch updated data after the exchange operation is successful
       fetchData();
       console.log('Fetch updated data successful!');

       // Reset input fields or clear any other necessary states
       setItemId('');
       setItemTotal('');
     })
     .catch(error => {
       // Handle error if the exchange operation fails
       console.error('Exchange error:', error);
     });
 

    console.log('Item ID:', itemId);
    console.log('Email User:', emailUser);
    console.log('Item Total:', itemtotal);
    
  };




  return (
    <div>
      {/* <h1>{JSON.stringify(item[0].itemid)}</h1>
      <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item[0].itemimg} alt=""/> */}
      {item.map((item, index) => (
        <div key={index}>
          <a className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="flex flex-row justify-between items-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          
          
          <input
          
            type="number"
            min="0"
            id="itemId-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // placeholder="Fill item ID..."
            placeholder={`Item NO. ${item.itemid}`}
            // value={item.itemid} // Set the input value to item.itemid
            readOnly // Make the input read-only
            style={{ textAlign: 'center' }}
          />
         
      </div>

            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.itemimg} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <center>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{JSON.stringify(item.itemname)}<br/>
                <span className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300 ml-4">{JSON.stringify(item.itemprice)} stars, &nbsp;amount {JSON.stringify(item.itemtotal)}</span>

              </h5></center>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{JSON.stringify(item.itemdetail)}
              </p><br />

              
              {/* <div className="flex flex-row justify-between items-center"> */}
                {/* <div className="custom-number-input h-10 w-32" > */}

                  
                  <input type="number" min='0' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill item total no.." onChange={handleChangeItemTotal} />
                
                {/* </div>
                <br /> */}

              {/* </div> */}
              <br /><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"  onClick={(e) => handleClickExchage(e, item.itemid)}>
                Exchange
              </button>
            </div>
          </a><br />
        </div>
      ))}

    </div>
  );
}

export default CardReward;
