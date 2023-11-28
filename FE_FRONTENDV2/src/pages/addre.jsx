import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IoChevronBackSharp } from 'react-icons/io5';
<<<<<<< HEAD
import { Link,useNavigate} from 'react-router-dom';
=======
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
import Base from '@/layouts/base.jsx'
import { setEmail } from '@/stores/auth/index';
import { createreward } from '@/stores/api/index';
// import axiosInstance from '../utils/api/axiosIntance.js';


function addre() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    details: '',
    price: '',
    total: '',
  });

=======
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    detail: '',
    price: '',
    total: '',
    
  });
  const dispatch = useDispatch();
  const email = useSelector(state => state.authStore.email);
  const [emailUser, setEmailUser] = useState();
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f

  useEffect(() => {
    dispatch(setEmail());
  }, [dispatch]);

<<<<<<< HEAD
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
=======
  useEffect(() => {
    setEmailUser(email);
  }, [email]);
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
<<<<<<< HEAD
  // console.log("Images : ", images);
  // console.log("imageURLs : ", imageURLs);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // const numericValue = value.replace(/[^0-9]/g, '');
    setFormData({
      formData,
      [name]: value,
=======

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'id' || name === 'price' || name === 'total' ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    console.log("data : ", formData);
    console.log("Images : ", images);
    alert('Update Form button clicked!');
    // Prepare data to send to the backend
    const dataToSend = {
      formData,
      images,

    };
    setFormData({
      id: '',
      name: '',
      details: '',
      price: '',
      total: '',
    });
    navigate('/point');
    
    try {
      // Send data to the backend
      const response = await fetch('your_backend_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response from the backend if needed
      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
    
  };
=======

    // Check if required fields are filled
    if (!formData.id || !formData.name || !formData.detail || !formData.price || !formData.total || images.length === 0|| !email) {
      alert('Please fill in all required fields and upload at least one image.');
      return;
    }

    // Dispatch the createReward action
    console.log('FormData:', formData);
    console.log('EmailUser:', emailUser);
    console.log('Images:', images);

    // dispatch(createReward({ ...formData,email: emailUser, img:images }));

     // Create a new FormData object and append the image files
  const formDataWithImages = new FormData();
  formDataWithImages.append('id', formData.id);
  formDataWithImages.append('name', formData.name);
  formDataWithImages.append('detail', formData.detail);
  formDataWithImages.append('price', formData.price);
  formDataWithImages.append('total', formData.total);
  formDataWithImages.append('email', email);
  images.forEach((image) => {
    formDataWithImages.append('img', image);
  });
  

  // Log the content of formDataWithImages
  console.log('FormDataWithImages:', formDataWithImages);

  // Dispatch the createReward action with the FormData object
  dispatch(createreward(formDataWithImages));
  // await axiosInstance.post('/api/createreward', formDataWithImages)

    // Clear form fields after dispatching the action
    setFormData({
      id: '',
      name: '',
      detail: '',
      price: '',
      total: '',
    });
    setImages([]);
    navigate("/point");
  };
  
  
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
  return (
    <Base>
      <br />
      <div>
        <div className="flex items-center ml-2">
          <Link to="/point" className="flex items-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl flex items-center">
              <IoChevronBackSharp style={{ marginRight: '3px' }} />Back
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className='w-50  text-black p-5'>

            <div className="flex flex-col justify-center items-center font-bold " style={{ fontSize: '20px' }}>

              <h3 >ADD REWARD</h3>
            </div>
            <br /><br />
<<<<<<< HEAD
            <form onSubmit={handleSubmit}>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="id">ID : </label>&nbsp;&nbsp;
                <input type="text" name='id' className='form-control' value={formData.id} onChange={handleChange} />
=======
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="id">ID : </label>&nbsp;&nbsp;
                <input type="number" name='id' className='form-control' value={formData.id} onChange={handleChange} />
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="name">Name : </label>&nbsp;&nbsp;
                <input type="text" name='name' className='form-control' value={formData.name} onChange={handleChange} />
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<<<<<<< HEAD
                <label htmlFor="details">Details : </label>&nbsp;&nbsp;
                <input type="text" name='details' className='form-control' value={formData.details} onChange={handleChange} />
=======
                <label htmlFor="detail">detail : </label>&nbsp;&nbsp;
                <input type="text" name='detail' className='form-control' value={formData.detail} onChange={handleChange} />
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="price">Price : </label>&nbsp;&nbsp;
<<<<<<< HEAD
                <input type="text" name='price' className='form-control' value={formData.price} onChange={handleChange} />
=======
                <input type="number" name='price' className='form-control' value={formData.price} onChange={handleChange} />
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
              </div>
              <br />
              <div>
                <label htmlFor="total">Total of Items: </label>&nbsp;&nbsp;
<<<<<<< HEAD
                <input type="text" name='total' className='form-control' value={formData.total} onChange={handleChange} />
=======
                <input type="number" name='total' className='form-control' value={formData.total} onChange={handleChange} />
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
              </div>
              <div><br />

                <div className="App">

                  <p style={{ color: 'red', fontSize: 'small' }}>*If you want to change Image, choose a new file</p>


                  <input type="file" accept="image/*" name="img" onChange={onImageChange} />
                  {imageURLs.map((imageSrc, idx) => (
                    <img key={idx} width="640" height="360" src={imageSrc} />
                  ))}
                </div>
              </div><br />
              <div className="flex flex-col justify-center items-center">
<<<<<<< HEAD
=======
                
>>>>>>> ffac7196123ce9b4ba046e618d582e021f31f47f
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" >Submit</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </Base>





  )
}
export default addre;



// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { IoChevronBackSharp } from 'react-icons/io5';
// import { Link, useNavigate } from 'react-router-dom';
// import Base from '@/layouts/base.jsx'
// import { setEmail } from '@/stores/auth/index';
// import { createreward } from '@/stores/api/index';
// // import axiosInstance from '../utils/api/axiosIntance.js';


// function addre() {
//   const navigate = useNavigate(); 
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     detail: '',
//     price: '',
//     total: '',
    
//   });
//   const dispatch = useDispatch();
//   const email = useSelector(state => state.authStore.email);
//   const [emailUser, setEmailUser] = useState();
//   const [images, setImages] = useState([]);
//   const [imageURLs, setImageURLs] = useState([]);

//   useEffect(() => {
//     dispatch(setEmail());
//   }, [dispatch]);

//   useEffect(() => {
//     setEmailUser(email);
//   }, [email]);

//   useEffect(() => {
//     if (images.length < 1) return;
//     const newImageUrls = [];
//     images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
//     setImageURLs(newImageUrls);
//   }, [images]);

//   const onImageChange = (e) => {
//     // Use URL.createObjectURL directly without storing images in state
//     setImages([URL.createObjectURL(e.target.files[0])]);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const parsedValue = name === 'id' || name === 'price' || name === 'total' ? parseInt(value) : value;
//     setFormData({
//       ...formData,
//       [name]: parsedValue,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Check if required fields are filled
//     if (!formData.id || !formData.name || !formData.detail || !formData.price || !formData.total || images.length === 0 || !email) {
//       alert('Please fill in all required fields and upload at least one image.');
//       return;
//     }
  
//     try {
//       // Step 1: Create Reward
//       const rewardData = {
//         id: formData.id,
//         name: formData.name,
//         detail: formData.detail,
//         price: formData.price,
//         total: formData.total,
//         email: email,
//       };
  
//       const rewardResponse = await dispatch(createreward(rewardData));
//       console.log('Reward created successfully:', rewardResponse);
  
//       // Step 2: Upload Images
//       const formDataWithImages = new FormData();
//       formDataWithImages.append('id', formData.id);
//       formDataWithImages.append('name', formData.name);
//       formDataWithImages.append('detail', formData.detail);
//       formDataWithImages.append('price', formData.price);
//       formDataWithImages.append('total', formData.total);
//       formDataWithImages.append('email', email);
  
//       images.forEach((image) => {
//         formDataWithImages.append('img', image);
//       });
  
//       const imageResponse = await axiosInstance.post('/api/uploadImages', formDataWithImages);
//       console.log('Images uploaded successfully:', imageResponse);
  
//       // Step 3: Any other steps...
  
//       // Clear form fields after all API calls
//       setFormData({
//         id: '',
//         name: '',
//         detail: '',
//         price: '',
//         total: '',
//       });
//       setImages([]);
//       navigate("/point");
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle errors as needed
//     }
//   };
  
  
  
//   return (
//     <Base>
//       <br />
//       <div>
//         <div className="flex items-center ml-2">
//           <Link to="/point" className="flex items-center">
//             <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl flex items-center">
//               <IoChevronBackSharp style={{ marginRight: '3px' }} />Back
//             </button>
//           </Link>
//         </div>
//         <div className="flex flex-col justify-center items-center">
//           <div className='w-50  text-black p-5'>

//             <div className="flex flex-col justify-center items-center font-bold " style={{ fontSize: '20px' }}>

//               <h3 >ADD REWARD</h3>
//             </div>
//             <br /><br />
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 <label htmlFor="id">ID : </label>&nbsp;&nbsp;
//                 <input type="number" name='id' className='form-control' value={formData.id} onChange={handleChange} />
//               </div>
//               <br />
//               <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 <label htmlFor="name">Name : </label>&nbsp;&nbsp;
//                 <input type="text" name='name' className='form-control' value={formData.name} onChange={handleChange} />
//               </div>
//               <br />
//               <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 <label htmlFor="detail">detail : </label>&nbsp;&nbsp;
//                 <input type="text" name='detail' className='form-control' value={formData.detail} onChange={handleChange} />
//               </div>
//               <br />
//               <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 <label htmlFor="price">Price : </label>&nbsp;&nbsp;
//                 <input type="number" name='price' className='form-control' value={formData.price} onChange={handleChange} />
//               </div>
//               <br />
//               <div>
//                 <label htmlFor="total">Total of Items: </label>&nbsp;&nbsp;
//                 <input type="number" name='total' className='form-control' value={formData.total} onChange={handleChange} />
//               </div>
//               <div><br />

//                 <div className="App">

//                   <p style={{ color: 'red', fontSize: 'small' }}>*If you want to change Image, choose a new file</p>


//                   <input type="file" accept="image/*" name="img" onChange={onImageChange} />
//                   {imageURLs.map((imageSrc, idx) => (
//                     <img key={idx} width="640" height="360" src={imageSrc} />
//                   ))}
//                 </div>
//               </div><br />
//               <div className="flex flex-col justify-center items-center">
                
//                 <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" >Submit</button>
//               </div>

//             </form>
//           </div>
//         </div>

//       </div>
//     </Base>





//   )
// }
// export default addre;
