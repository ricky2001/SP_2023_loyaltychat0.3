import React from "react";
import { useState, useEffect } from "react";
import { IoChevronBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Base from '@/layouts/base.jsx'
function addre() {
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
  console.log("Images : ", images);
  console.log("imageURLs : ", imageURLs);


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
          <div className='w-50 border bg-secondary text-white p-5'>

            <div className="flex flex-col justify-center items-center">

              <h3>Add Reward</h3>
            </div>
            <form>
              <div>
                <label htmlFor="id">Id : </label>
                <input type="text" name='id' className='form-control' />
              </div>
              <div>
                <label htmlFor="name">Name : </label>
                <input type="text" name='name' className='form-control' />
              </div>
              <div>
                <label htmlFor="details">Details : </label>
                <input type="text" name='Details' className='form-control' />
              </div>
              <div>
                <label htmlFor="price">Price : </label>
                <input type="text" name='price' className='form-control' />
              </div>
              <div>
                <label htmlFor="total">Total: </label>
                <input type="text" name='total' className='form-control' />
              </div>
              <div><br />

                <div className="App">
                  <input type="file" multiple accept="image/*" onChange={onImageChange} />
                  {imageURLs.map((imageSrc, idx) => (
                    <img key={idx} width="640" height="360" src={imageSrc} />
                  ))}
                </div>
              </div><br />
              <div className="flex flex-col justify-center items-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Submit</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </Base>





  )
}
export default addre;