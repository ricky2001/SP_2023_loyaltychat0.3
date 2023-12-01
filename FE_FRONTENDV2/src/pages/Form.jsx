import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Base from '@/layouts/base.jsx'
import { setEmail } from '@/stores/auth/index'
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../utils/api/axiosIntance.js';
import { keepForm } from '@/stores/api/index';
import Swal from 'sweetalert2';

function Form() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isPopupOpenForm, setPopupOpenForm] = useState(false);
  const [formList, setFormList] = useState([]);
  const [newEventName, setnewEventName] = useState('');
  const [updateEventName, setupdateEventName] = useState('');
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;
  const email = useSelector(state => state.authStore.email);
  const [emailUser, setEmailUser] = useState();
  const dispatch = useDispatch();
  const [satisfactionLevel, setSatisfactionLevel] = useState('');
  const [comments, setComments] = useState('');


  useEffect(() => {
    dispatch(setEmail());
  }, [dispatch]);

  useEffect(() => {
    setEmailUser(email);
  }, [email]);

  const postForm = async () => {
    if(newEventName!=""){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Create form successfully"
      });
      const response = await axiosInstance.post('/api/createForm', {
      content: newEventName,
      Email: emailUser,
      Date: new Date().getTime(), // Example timestamp creation, adjust according to Firestore timestamp
    });
    const newFormId = response.data.formId;
    setFormList([{ id: newFormId, Email: emailUser, EventName: newEventName }, ...formList]);
    setPopupOpen(false);
    // setNewAuthor('');
    setnewEventName('');
    }else{
      Swal.fire({
        icon: "error",
        title: "Creat Fail. ",
        text: "You must fill form name !",
        confirmButtonColor:"#00324D",
      });
    }
    
  };

  useEffect(() => {
    getForm();
  }, []);

  const getForm = async () => {
    const response = await axiosInstance.get('/api/getForm');
    const sortedForm = response.data.formItems.sort((a, b) => b.timestamp - a.timestamp);
    setFormList(sortedForm);
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setnewEventName('');
  };

  const openPopupForm = (id) => {
    setPopupOpenForm(true);
    setSelectedFormId(id);
  };

  const closePopupForm = () => {
    setPopupOpenForm(false);
    setSatisfactionLevel('');
    setComments('');
  };

  const openEdit = (id) => {
    setSelectedFormId(id);
    setEditOpen(true);
    const selectedEventName = formList.find(form => form.id === id);
    setupdateEventName(selectedEventName.EventName);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setupdateEventName('');
    setSelectedFormId(null);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/getForm');
      const sortedForm = response.data.formItems.sort((a, b) => b.timestamp - a.timestamp);
      setFormList(sortedForm);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        keepForm({
          email: emailUser,
          EventName: selectedFormId, // Assuming selectedFormId is the correct identifier
          comments: comments,
          satisfied: satisfactionLevel,
        })
      );

      // Fetch updated data after the exchange operation is successful
      fetchData();
      console.log('Fetch updated data successful!');

      // Reset input fields or clear any other necessary states
      setSatisfactionLevel('');
      setComments('');
      closePopupForm();
    } catch (error) {
      // Handle error if the exchange operation fails
      console.error('Exchange error:', error);
    }
  };




  const performEdit = async () => {
    if (updateEventName) {
      const updatedFormList = [...formList];
      const formIndex = updatedFormList.findIndex((form) => form.id === selectedFormId);
      updatedFormList[formIndex] = { id: selectedFormId, EventName: updateEventName };
      setFormList(updatedFormList);
      Swal.fire({
        title: "Are you sure?",
        text: "You want to edit this form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, edit it!"
      }).then((result) => {
        if (result.isConfirmed) {    
      
      axiosInstance.post(`api/updateForm`, {
        EventName: updateEventName,
        id:selectedFormId,
      });
      closeEdit();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Edit form successfully"
      });
        }
      });

      // try {
      //   await axiosInstance.post(`api/updateForm`, {
      //     EventName: updateEventName,
      //   });
      // } catch (error) {
      //   console.error("Failed to update form:", error);
      // }
    }
  };

  const performDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedFormList = formList.filter(form => form.id !== id);
    setFormList(updatedFormList);
    axiosInstance.delete(`api/deleteForm?id=${id}`);
    closeEdit();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Delete form successfully"
    });
      }
    });
    
    // try {
    //   await axiosInstance.delete(`api/deleteForm?id=${id}`);
    // } catch (error) {
    //   console.error("Failed to delete form:", error);
    // }
    // closeEdit();
  }


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(formList.length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = formList.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Base>

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 mx-4 lg:mx-12 w-full ">
        <div className="max-w-2xl mx-auto px-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4 p-5">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Survey</h5>
            <div className="ml-2"></div>
            <Link to={`/QRcodegenerator`} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-xl">Event QRcode</Link>&nbsp;
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl" onClick={openPopup}>
              Create Form
            </button>
          </div>

          <div className="form-list">
            {currentCards.map((form, index) => (
              <div key={form.id} className="card flex flex-row border p-5 mb-5">
                <p className="mb-5">Event Name: {form.EventName}</p>
                <div className="flex items-center ml-auto">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-xl ml-2" onClick={() => openEdit(form.id)}>
                    Form Edit
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded ml-2" onClick={() => openPopupForm(form.id)}>
                    Do
                  </button>
                </div>
              </div>
            ))}
          </div>




          <div className="pagination">
            {formList.length > cardsPerPage && (
              <div className="page-numbers">
                <button onClick={prevPage}>Previous</button>
                {Array.from({ length: Math.ceil(formList.length / cardsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={nextPage}>Next</button>
              </div>
            )}
          </div>
        </div>


        {isPopupOpenForm && (
          <div className="popup">
            <h2>User Satisfaction Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="satisfactionLevel">Satisfaction Level:</label>
                <select
                  id="satisfactionLevel"
                  value={satisfactionLevel}
                  onChange={(e) => setSatisfactionLevel(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="very-satisfied">Very Satisfied</option>
                  <option value="satisfied">Satisfied</option>
                  <option value="neutral">Neutral</option>
                  <option value="dissatisfied">Dissatisfied</option>
                  <option value="very-dissatisfied">Very Dissatisfied</option>
                </select>
              </div>
              <div>
                <label htmlFor="comments">Comments:</label>
                <textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              <div>
                <center>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                  >
                    Submit
                  </button>&nbsp;&nbsp;&nbsp;
                  <button
                    type="cancel"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
                    onClick={closePopupForm}
                  >
                    Cancel
                  </button>
                  
                </center>
              </div>
            </form>
          </div>
        )}


{isPopupOpen && (
  <div className="popup">
    <h2>Create Form</h2>
    <textarea
      placeholder="New Event Name"
      value={newEventName}
      onChange={(e) => setnewEventName(e.target.value)}
    />
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <button className="bg-blue-500 text-white" onClick={postForm}>
        Save Event
      </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button className="bg-red-500 text-white" onClick={closePopup}>
        Close
      </button>
    </div>
  </div>
)}


        {isEditOpen && (
          <div className="popup">
            <h2>Edit/Delete Forms</h2>

            <textarea
              placeholder="Event Name"
              value={updateEventName}
              onChange={(e) => setupdateEventName(e.target.value)}
            />
            <div className="button-container">&nbsp;&nbsp;
              <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-0 px-1 rounded-xl" onClick={performEdit}>
                Update Form
              </button>&nbsp;
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl" onClick={() => performDelete(selectedFormId)}>
                Delete Form
              </button>&nbsp;
              <button className="bg-red-500  text-white font-bold py-0 px-2 rounded-xl" onClick={closeEdit}>
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </Base>
  );
}

export default Form;
