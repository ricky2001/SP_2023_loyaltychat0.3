import React, { useState, useEffect } from 'react';
import '@/assets/css/counter.css';
import { useSelector, useDispatch } from 'react-redux';
import { useExchange } from '@/stores/api/index';
import { setEmail } from '@/stores/auth/index'
import axios from 'axios';


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
      const response = await axios.get('http://localhost:3000/api/getUserItemExchange');
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
       console.log('Exchange successful!');

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
            {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{JSON.stringify(item.itemid)} </h5> */}
            {/* <input
              type="number"
              min="0"
              id="itemId-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Fill item ID..."
              onChange={handleItemId} // Attach handleItemId function to the input element's onChange event
            /> */}
          <input
            type="number"
            min="0"
            id="itemId-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fill item ID..."
            value={item.itemid} // Set the input value to item.itemid
            readOnly // Make the input read-only
          />

            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.itemimg} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{JSON.stringify(item.itemname)}
                <span className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300 ml-4">{JSON.stringify(item.itemprice)} stars, &nbsp;amount {JSON.stringify(item.itemtotal)}</span>

              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{JSON.stringify(item.itemdetail)}
              </p><br />


              <div className="flex flex-row justify-between items-center">
                <div className="custom-number-input h-10 w-32" >

                  {/* <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                        <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 " name="custom-input-number" value="0"></input>
                    <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                        <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                    
                    </div> */}

                  <input type="number" min='0' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill item total no.." onChange={handleChangeItemTotal} />
                
                </div>
                <br />

              </div>
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
