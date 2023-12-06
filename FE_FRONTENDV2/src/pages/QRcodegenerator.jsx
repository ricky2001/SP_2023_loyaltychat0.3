import QRCode from 'qrcode.react';
import { useState, useEffect, useRef } from 'react';
import Base from '@/layouts/base.jsx';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/api/axiosIntance.js';
import html2canvas from 'html2canvas';
import '../components/QRcodegenerator.css';
import Swal from 'sweetalert2';

function QRcodegenerator() {
  const [formItems, setFormItems] = useState([]);
  const [originalFormItems, setOriginalFormItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const qrCodeRef = useRef(null);

  useEffect(() => {
    // Fetch form data from the backend when the component mounts
    axiosInstance.get('/api/getForm')
      .then(response => {
        const items = response.data.formItems;
        setFormItems(items);
        setOriginalFormItems(items);
      })
      .catch(error => {
        // console.error('Error fetching form data:', error);
      });
  }, []);

  const downloadQRCode = async (event) => {
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
      title: "Dowload successfully"
    });
    const qrCodeData = `EventName: ${event.EventName}, Date: ${event.Date}`;
    const qrCodeFileName = `${event.EventName.replace(/\s/g, '_')}_QRCode.png`;

    // Use html2canvas to capture the QR code as an image
    const canvas = await html2canvas(qrCodeRef.current);

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = qrCodeFileName;

    // Trigger a click on the download link
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Perform the search logic only if the search query is not empty
    if (value.trim() !== '') {
      // Update formItems based on the search query
      const filteredItems = originalFormItems.filter(item =>
        item.EventName.toLowerCase().includes(value.toLowerCase()) ||
        item.Date.toLowerCase().includes(value.toLowerCase())
      );
      setFormItems(filteredItems);
    } else {
      // If the search query is empty, show all items from the original list
      setFormItems(originalFormItems);
    }
  };

  return (
    <Base>
      <div className="container mx-auto mt-8 p-4">
        <Link to="/form" className="flex items-center">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl flex items-center">
            <IoChevronBackSharp style={{ marginRight: '3px' }} />Back
          </button>
        </Link>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Event List</h2>
          <div className="mb-4 flex items-center"> {/* Added flex container */}
            <input
              type="text"
              placeholder="Search events by name or date..."
              className="border p-2 rounded-md w-full"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md ml-2"
              style={{ alignSelf: 'stretch' }}
            >
              Search
            </button>
          </div>
          <ul>
            {formItems.map(item => (
              <li key={item.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-xl font-semibold mb-2">Event Name: {item.EventName}</p>
                <p className="text-gray-600">Date: {item.Date}</p>
                <div className="flex flex-col items-center">
                  <div ref={qrCodeRef} style={{ width: '150px', height: '150px' }}>
                    <QRCode
                      value={`EventName: ${item.EventName}, Date: ${item.Date}`}
                      size={150}
                      className="mt-2"
                    />
                  </div><br />
                  <button
                    onClick={() => downloadQRCode(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md mt-2"
                  >
                    Download QR Code
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Base>
  );
}

export default QRcodegenerator;
