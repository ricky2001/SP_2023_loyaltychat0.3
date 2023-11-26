import React from "react";
import { useState, useEffect } from "react";
import { IoChevronBackSharp } from 'react-icons/io5';
import { Link,useNavigate} from 'react-router-dom';
import Base from '@/layouts/base.jsx'
function addre() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    details: '',
    price: '',
    total: '',
  });



  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);
  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  // console.log("Images : ", images);
  // console.log("imageURLs : ", imageURLs);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // const numericValue = value.replace(/[^0-9]/g, '');
    setFormData({
      formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <form onSubmit={handleSubmit}>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="id">ID : </label>&nbsp;&nbsp;
                <input type="text" name='id' className='form-control' value={formData.id} onChange={handleChange} />
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="name">Name : </label>&nbsp;&nbsp;
                <input type="text" name='name' className='form-control' value={formData.name} onChange={handleChange} />
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="details">Details : </label>&nbsp;&nbsp;
                <input type="text" name='details' className='form-control' value={formData.details} onChange={handleChange} />
              </div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="price">Price : </label>&nbsp;&nbsp;
                <input type="text" name='price' className='form-control' value={formData.price} onChange={handleChange} />
              </div>
              <br />
              <div>
                <label htmlFor="total">Total of Items: </label>&nbsp;&nbsp;
                <input type="text" name='total' className='form-control' value={formData.total} onChange={handleChange} />
              </div>
              <div><br />

                <div className="App">

                  <p style={{ color: 'red', fontSize: 'small' }}>*If you want to change Image, choose a new file</p>


                  <input type="file" multiple accept="image/*" onChange={onImageChange} />
                  {imageURLs.map((imageSrc, idx) => (
                    <img key={idx} width="640" height="360" src={imageSrc} />
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