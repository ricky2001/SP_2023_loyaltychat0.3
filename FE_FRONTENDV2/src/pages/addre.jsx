// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { IoChevronBackSharp } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import Base from "@/layouts/base.jsx";
// import { setEmail } from "@/stores/auth/index";
// import axiosInstance from "../utils/api/axiosIntance.js";
// import Swal from 'sweetalert2'

// function AddReward() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     detail: "",
//     price: "",
//     total: "",
//     img: null,
//   });
//   const [images, setImages] = useState([]);
//   const [imageURLs, setImageURLs] = useState([]);
//   const email = useSelector(state => state.authStore.email);
//   const [emailUser, setEmailUser] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setEmail());
//   }, [dispatch]);

//   useEffect(() => {
//     setEmailUser(email);
//   }, [email]);

//   useEffect(() => {
//     console.log('Updated FormData:', formData);
//   }, [formData]);

//   useEffect(() => {
//     if (images.length > 0) {
//       const newImageUrls = images.map((image) => URL.createObjectURL(image));
//       setImageURLs(newImageUrls);
//     }
//   }, [images]);

//   const onImageChange = async (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         console.log('Image Result:', reader.result);

//         // Check the type of result (string or ArrayBuffer)
//         if (typeof reader.result === 'string') {
//           // Convert the base64 string to a Blob object
//           const blob = dataURLtoBlob(reader.result);

//           // Check if blob is not undefined before setting it in the state
//           // if (blob) {
//           setFormData({
//             ...formData,
//             img: reader.result,
//           });
//           // }
//         } else if (reader.result instanceof ArrayBuffer) {
//           // Handle ArrayBuffer case (you might want to convert it to a string or Blob)
//           console.error('ArrayBuffer is not supported in this example.');
//         }
//       };

//       reader.readAsDataURL(file);
//     }
//   };


//   // Function to convert base64 to Blob
//   function dataURLtoBlob(dataURL) {
//     if (typeof dataURL !== 'string') {
//       // Handle the case where dataURL is not a string
//       console.error('Invalid dataURL:', dataURL);
//       return null; // or return an appropriate default value
//     }
//     const arr = dataURL.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);

//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }

//     return new Blob([u8arr], { type: mime });
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const parsedValue = name === 'id' || name === 'price' || name === 'total' ? parseInt(value) : value;
//     setFormData({
//       ...formData,
//       [name]: parsedValue !== undefined ? parsedValue : "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "ADD REWARD successful!",
//       icon: "success"
//     });

//     if (!formData.id || !formData.name || !formData.detail || !formData.price || !formData.total || !email || !formData.img) {
//       Swal.fire({
//         icon: "error",
//         title: "Please fill in all required fields. ",
//         text: "(ID, Name, Detail, Price, Total) and upload at least one image.",
//         confirmButtonColor: "#00324D",

//       });
//       return;
//     }

//     const data = {
//       id: formData.id,
//       name: formData.name,
//       detail: formData.detail,
//       price: formData.price,
//       total: formData.total,
//       email: email,
//       img: formData.img,
//     };

//     try {
//       const response = await axiosInstance.post('api/createreward', data);
//       console.log('Backend Response:', response.data);

//       setFormData({
//         id: "",
//         name: "",
//         detail: "",
//         price: "",
//         total: "",
//         img: null,
//       });
//       setImages([]);
//       navigate("/point");
//     } catch (error) {
//       console.error('Error sending data to backend:', error);
//       alert('Error sending data to backend. Please check the console for details.');
//     }
//   };

//   return (
//     <Base>
//       <div className="container mx-auto">
//         <div className="flex items-center mt-4">
//           <Link to="/point">
//             <button className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
//               <IoChevronBackSharp style={{ marginRight: '3px' }} />
//               Back
//             </button>
//           </Link>
//         </div>

//         <div className="flex flex-col justify-center items-center mt-8">
//           <div className="bg-white w-full max-w-md p-8 rounded-xl">
//             <h3 className="text-2xl font-bold mb-4">ADD REWARD</h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="id" className="block text-gray-700 font-bold mb-1">ID</label>
//                 <input type="number" name="id" className="form-input" value={formData.id} onChange={handleChange} />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-gray-700 font-bold mb-1">Name</label>
//                 <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="detail" className="block text-gray-700 font-bold mb-1">Detail</label>
//                 <input type="text" name="detail" className="form-input" value={formData.detail} onChange={handleChange} />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="price" className="block text-gray-700 font-bold mb-1">Price</label>
//                 <input type="number" name="price" className="form-input" value={formData.price} onChange={handleChange} />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="total" className="block text-gray-700 font-bold mb-1">Total of Items</label>
//                 <input type="number" name="total" className="form-input" value={formData.total} onChange={handleChange} />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="img" className="block text-gray-700 font-bold mb-1">Image</label>
//                 <input type="file" accept="image/*" name="img" onChange={onImageChange} className="form-input" />
//                 {imageURLs.map((imageSrc, idx) => (
//                   <img key={idx} width="640" height="360" src={imageSrc} alt={`Image ${idx}`} className="mt-4" />
//                 ))}
//               </div>
//               <div className="flex justify-center">
//                 <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Base>
//   );
// }

// export default AddReward;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Base from "@/layouts/base.jsx";
import { setEmail } from "@/stores/auth/index";
import axiosInstance from "../utils/api/axiosIntance.js";
import Swal from 'sweetalert2'
function addre() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    detail: "",
    price: "",
    total: "",
    img: null,
  });
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const email = useSelector(state => state.authStore.email);
  const [emailUser, setEmailUser] = useState("");
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(setEmail());
  }, [dispatch]);

  useEffect(() => {
    setEmailUser(email);
  }, [email]);

  useEffect(() => {
    console.log('Updated FormData:', formData);
  }, [formData]);

  useEffect(() => {
    if (images.length > 0) {
      const newImageUrls = images.map((image) => URL.createObjectURL(image));
      setImageURLs(newImageUrls);
    }
  }, [images]);

  const onImageChange = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        console.log('Image Result:', reader.result);
  
        // Check the type of result (string or ArrayBuffer)
        if (typeof reader.result === 'string') {
          // Convert the base64 string to a Blob object
          const blob = dataURLtoBlob(reader.result);
  
          // Check if blob is not undefined before setting it in the state
            setFormData({
              ...formData,
              img: reader.result,
            });
        } else if (reader.result instanceof ArrayBuffer) {
          // Handle ArrayBuffer case (you might want to convert it to a string or Blob)
          console.error('ArrayBuffer is not supported in this example.');
        }
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  
  // Function to convert base64 to Blob
  function dataURLtoBlob(dataURL) {
    if (typeof dataURL !== 'string') {
      // Handle the case where dataURL is not a string
      console.error('Invalid dataURL:', dataURL);
      return null; // or return an appropriate default value
    }
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'id' || name === 'price' || name === 'total' ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue !== undefined ? parsedValue : "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "ADD REWARD successful!",
      icon: "success"
    });
  
    if (!formData.id || !formData.name || !formData.detail || !formData.price || !formData.total || !email || !formData.img) {
      Swal.fire({
        icon: "error",
        title: "Please fill in all required fields. ",
        text: "(ID, Name, Detail, Price, Total) and upload at least one image.",
        confirmButtonColor:"#00324D",
        
      });
      
      return; // Remove the unnecessary res.status(400).json line
    }
  
    const data = {
      id: formData.id,
      name: formData.name,
      detail: formData.detail,
      price: formData.price,
      total: formData.total,
      email: email,
      img:formData.img,
    };
  
    try {
  
      const response = await axiosInstance.post('api/createreward', data);
  console.log('Backend Response:', response.data);
  
      setFormData({
        id: "",
        name: "",
        detail: "",
        price: "",
        total: "",
        img: null, 
      });
      setImages([]);
      navigate("/point");
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('Error sending data to backend. Please check the console for details.');
    }
  };
  

  
  
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
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="id">ID : </label>&nbsp;&nbsp;
                <input type="number" name='id' className='form-control' value={formData.id} onChange={handleChange} />
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="name">Name : </label>&nbsp;&nbsp;
                <input type="text" name='name' className='form-control' value={formData.name} onChange={handleChange} />
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="detail">detail : </label>&nbsp;&nbsp;
                <input type="text" name='detail' className='form-control' value={formData.detail} onChange={handleChange} />
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="price">Price : </label>&nbsp;&nbsp;
                <input type="number" name='price' className='form-control' value={formData.price} onChange={handleChange} />
              </div>
              <br />
              <div>
                <label htmlFor="total">Total of Items: </label>&nbsp;&nbsp;
                <input type="number" name='total' className='form-control' value={formData.total} onChange={handleChange} />
              </div>
              <div><br />

                <div className="App">

                  <p style={{ color: 'red', fontSize: 'small' }}>*If you want to change Image, choose a new file</p>


                  <input type="file" accept="image/*" name="img" onChange={onImageChange} />
          {imageURLs.map((imageSrc, idx) => (
            <img key={idx} width="640" height="360" src={imageSrc} alt={`Image ${idx}`} />
          ))}

                </div>
              </div><br />
              <div className="flex flex-col justify-center items-center">
                
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