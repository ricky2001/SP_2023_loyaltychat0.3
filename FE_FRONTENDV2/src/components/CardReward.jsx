import React, { useState, useEffect } from 'react';
import '@/assets/css/counter.css';
import { useSelector, useDispatch } from 'react-redux';
import { useExchange } from '@/stores/api/index';
import { setEmail } from '@/stores/auth/index';
import axiosInstance from '../utils/api/axiosIntance.js';

function CardReward() {
  const [item, setItem] = useState([]);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authStore.email);
  const [emailUser, setEmailUser] = useState();
  const [itemtotal, setItemTotal] = useState('');
  const [itemId, setItemId] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showdelPopup, setShowdelPopup] = useState(false);
  
  
  const handleConfirmation = () => {
    // Handle confirmation logic here
    console.log('Confirmed');
    setShowPopup(false);
  };

  const handleCancellation = () => {
    // Handle cancellation logic here
    console.log('Cancelled');
    setShowPopup(false);
  };
  const Cancellation = () => {
    // Handle cancellation logic here
    console.log('Cancelled');
    setShowdelPopup(false);
  };
  const openEditPopup = (itemId) => {
    // Find the selected item by itemId
    const selectedItem = item.find((i) => i.itemid === itemId);

    // Set initial values for the popup based on the selected item
    setName(selectedItem.itemname || '');
    setDetail(selectedItem.itemdetail || '');
    setPrice(selectedItem.itemprice || '');
    setTotal(selectedItem.itemtotal || '');

    setEditOpen(true);
    setSelectedItemId(itemId);
  };

  const closeEditPopup = () => {
    setEditOpen(false);
    setSelectedItemId(null);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('api/getUserItemExchange');
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
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChangeItemTotal = (e) => {
    setItemTotal(e.target.value);
  };

  const handleClickExchange = async (e, itemId) => {
    e.preventDefault();

    if (itemtotal > 0) {
      dispatch(useExchange({ emailuser: emailUser, itemid: itemId, itemTotal: itemtotal }))
        .then(() => {
          fetchData();
          console.log('Fetch updated data successful!');
          setItemId('');
          setItemTotal('');
        })
        .catch((error) => {
          console.error('Exchange error:', error);
        });
    } else {
      console.log('Itemtotal is 0 or null. Exchange operation not performed.');
    }

    console.log('Item ID:', itemId);
    console.log('Email User:', emailUser);
    console.log('Item Total:', itemtotal);
  };

  const handleUpdateReward = async () => {
    console.log('Updating Reward. Name:', name, 'Detail:', detail, 'Price:', price, 'Total:', total);
    try {
      const updateData = {
        email: emailUser,
        id: selectedItemId,
        name: name,
        detail: detail,
        price: parseInt(price),
        total: parseInt(total),
      };
      console.log('Update Data:', updateData);
      const response = await axiosInstance.post('api/updatereward', updateData);

      if (response.status === 200) {
        console.log('Reward updated successfully!');
        fetchData();
      } else {
        console.error('Error updating reward:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating reward:', error.message);
    }

    // closeEditPopup();
    handleCancellation();
  };


  const handleDeleteReward = async (itemId) => {
    console.log('Deleting item with ID:', itemId);
    try {
      // Call the backend API to delete the reward
      const response = await axiosInstance.delete('api/deletereward', { data: { itemid: itemId } });
  
      if (response.status === 200) {
        console.log('Reward deleted successfully!');
        fetchData();
      } else {
        console.error('Error deleting reward:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting reward:', error.message);
    }
  
    closeEditPopup();
  };
  

  return (
    <div>
      {item.map((item, index) => (
        <div key={index}>
          <a className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex flex-row justify-between items-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
              <input
                type="number"
                min="0"
                id="itemId-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Item NO. ${item.itemid}`}
                readOnly
                style={{ textAlign: 'center' }}
              />
            </div>
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.itemimg} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <center>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{JSON.stringify(item.itemname)}<br />
                  <span className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300 ml-4">{JSON.stringify(item.itemprice)} stars, &nbsp;amount {JSON.stringify(item.itemtotal)}</span>
                </h5>
              </center>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{JSON.stringify(item.itemdetail)}
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-xl ml-2 " onClick={() => openEditPopup(item.itemid)}>
                Reward Edit
              </button>
              {isEditOpen && selectedItemId === item.itemid && (
                <div style={{ width: '400px', height: '300px' }} className="popup">
                  <div>
                    <div>
                      <label htmlFor="name">Name : </label>&nbsp;&nbsp;
                      <input type="text" name="name" className="form-control" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="details">Details : </label>&nbsp;&nbsp;
                      <input type="text" name="detail" className="form-control" defaultValue={detail} onChange={(e) => setDetail(e.target.value)} />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="price">Price : </label>
                      <input type="text" name="price" className="form-control" defaultValue={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <br />
                    <div>
                      <label htmlFor="total">Total of Items: </label>
                      <input type="text" name="total" className="form-control" defaultValue={total} onChange={(e) => setTotal(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <center>
                      <div className="button-container">&nbsp;&nbsp;
                        <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-0 px-1 rounded-xl" onClick={() => setShowPopup(true)}>
                          Update Reward
                        </button>&nbsp;
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl"
                          // onClick={() => handleDeleteReward(item.itemid)}
                          onClick={() => setShowdelPopup(true)}
                        >
                          Delete Reward
                        </button>&nbsp;<br />
                        <br />
                        <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-0 px-2 rounded-xl" onClick={closeEditPopup}>
                          Cancel
                        </button>
                      </div>
                    </center>
                  </div>
                </div>
              )}
              <br />
              <input type="number" min="0" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fill item total no.." onChange={handleChangeItemTotal} />
              <br />
              <button className="bg-blue-500 hover.bg-blue-700 text-white font.bold py-2 px-4 rounded-xl" onClick={(e) => handleClickExchange(e, item.itemid)}>
                Exchange
              </button>
            </div>
          </a><br />
        </div>
      ))}
      <div>

      {showPopup && (
        <div className="popup">
          <div className="relative w-full max-w-md max-h-full">
                   <div >
                       <div className="p-6 text-center">
                           <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                           <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you Sure to  Update?</h3>
                           <button  type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleUpdateReward}>
                               Yes, I'm sure
                           </button>
                           <button   className="bg-red-700 hover:bg-red-800 text-white font-bold py-0 px-2 rounded-xl" onClick={handleCancellation}>No, cancel</button>
                       </div>
                   </div>
               </div>
        </div>
      )}
      {showdelPopup && (
        <div className="popup">
          <div className="relative w-full max-w-md max-h-full">
                   <div >
                       <div className="p-6 text-center">
                           <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                           <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you Sure to  Delete?</h3>
                           <button  type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={() => handleDeleteReward(item.itemid)}>
                               Yes, I'm sure
                           </button>
                           <button   className="bg-red-700 hover:bg-red-800 text-white font-bold py-0 px-2 rounded-xl" onClick={Cancellation}>No, cancel</button>
                       </div>
                   </div>
               </div>
        </div>
      )}
    </div>
    </div>
  );
  
}

export default CardReward;
