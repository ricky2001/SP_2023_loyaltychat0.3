
// import React, { useEffect, useRef, useState } from 'react';
// import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
// import { Link } from 'react-router-dom';
// import Base from '@/layouts/base.jsx'
// import { IoChevronBackSharp} from "react-icons/io5";
// import { setEmail } from '@/stores/auth/index'
// import { scanqrCode } from '@/stores/api/index';
// import { useSelector, useDispatch } from 'react-redux';

// const QRCodeScanner = () => {
//   const videoRef = useRef(null);
//   const codeReader = new BrowserMultiFormatReader();
//   const [scannedData, setScannedData] = useState('');
//   const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
//   const [videoInputDevices, setVideoInputDevices] = useState([]);
//   const dispatch = useDispatch();
//   const email = useSelector(state => state.authStore.email);
//   const [emailUser, setEmailUser] = useState();

//   useEffect(() => {
//     dispatch(setEmail());
//   }, [dispatch]);

//   useEffect(() => {
//     setEmailUser(email);
//   }, [email]);
//   useEffect(() => {
//     codeReader
//       .listVideoInputDevices()
//       .then((devices) => {
//         setVideoInputDevices(devices);
//         if (devices.length > 0) {
//           codeReader.decodeFromVideoDevice(devices[selectedDeviceIndex].deviceId, videoRef.current, (result, error) => {
//             if (result) {
//               dispatch(scanqrcode({ emailuser: emailUser, event:result.getText() }))
//      .then(() => {
//        // Fetch updated data after the exchange operation is successful
//        fetchData();
//        console.log('Fetch updated data successful!');

//        // Reset input fields or clear any other necessary states
//      })
//      .catch(error => {
//        // Handle error if the exchange operation fails
//        console.error('Exchange error:', error);
//      });
//               setScannedData(result.getText());
//             } else if (error && error instanceof NotFoundException) {
//               console.log('No QR code found.');
//             }
//           });
//         } else {
//           console.error('No video input devices found.');
//         }
//       })
//       .catch((err) => {
//         console.error('Error accessing video devices:', err);
//       });

//     return () => {
//       codeReader.reset();
//     };
//   }, [selectedDeviceIndex]);

//   const switchCamera = () => {
//     if (videoInputDevices.length > 1) {
//       setSelectedDeviceIndex((selectedDeviceIndex + 1) % videoInputDevices.length);
//     }
//   };

//   return (
//     <Base>
//     <br></br>
    
    
//     <div className="flex items-center ml-2">
//     {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
    
//          <Link to="/calendar" className="flex items-center">
//           <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl flex items-center">
//           <IoChevronBackSharp style={{ marginRight: '3px'}}/>Back
//           </button>
//         </Link>
//         </div>
      
//     <center>
//     <div>
//       <h2>QR Code Scanner</h2>
//       <div>
//         <video ref={videoRef} playsInline autoPlay muted />
//         <p>Scanned QR Code: {scannedData}</p>
//         {/* <p>Selected Camera: {videoInputDevices[selectedDeviceIndex]?.label || 'Unknown Camera'}</p> */}
//         <center>
//           <button
//           onClick={switchCamera}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
//         >
//           Switch Camera
//         </button>
//         </center>
        
        
//       </div>
      
     
//     </div>
//     </center>
//     </Base>
//   );
// };

// export default QRCodeScanner;


import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Link } from 'react-router-dom';
import Base from '@/layouts/base.jsx'
import { IoChevronBackSharp } from 'react-icons/io5';
import { setEmail } from '@/stores/auth/index';
import { scanqrCode } from '@/stores/api/index';
import { useSelector, useDispatch } from 'react-redux';

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const [scannedData, setScannedData] = useState('');
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const dispatch = useDispatch();
  const email = useSelector(state => state.authStore.email);
  const [emailUser, setEmailUser] = useState();

  const fetchData = () => {
    // Implement the logic to fetch updated data here
    console.log('Fetching updated data...');
  };

  useEffect(() => {
    dispatch(setEmail());
  }, [dispatch]);

  useEffect(() => {
    setEmailUser(email);
  }, [email]);

  useEffect(() => {
    if (emailUser) {
      codeReader
        .listVideoInputDevices()
        .then((devices) => {
          setVideoInputDevices(devices);
          if (devices.length > 0) {
            codeReader.decodeFromVideoDevice(devices[selectedDeviceIndex].deviceId, videoRef.current, (result, error) => {
              if (result) {
                dispatch(scanqrCode({ emailuser: emailUser, event: result.getText() }))
                  .then(() => {
                    // Fetch updated data after the exchange operation is successful
                    fetchData();
                    console.log('Fetch updated data successful!');

                    // Reset input fields or clear any other necessary states
                  })
                  .catch(error => {
                    // Handle error if the exchange operation fails
                    console.error('Exchange error:', error);
                  });
                setScannedData(result.getText());
              } else if (error && error instanceof NotFoundException) {
                console.log('No QR code found.');
              }
            });
          } else {
            console.error('No video input devices found.');
          }
        })
        .catch((err) => {
          console.error('Error accessing video devices:', err);
        });
    }

    return () => {
      codeReader.reset();
    };
  }, [selectedDeviceIndex, emailUser]);

  const switchCamera = () => {
    if (videoInputDevices.length > 1) {
      setSelectedDeviceIndex((selectedDeviceIndex + 1) % videoInputDevices.length);
    }
  };

  return (
    <Base>
      <br />
      <div className="flex items-center ml-2">
        <Link to="/calendar" className="flex items-center">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl flex items-center">
            <IoChevronBackSharp style={{ marginRight: '3px' }} />Back
          </button>
        </Link>
      </div>
      <center>
        <div>
          <h2>QR Code Scanner</h2>
          <div>
            <video ref={videoRef} playsInline autoPlay muted />
            <p>Scanned QR Code: {scannedData}</p>
            <center>
              <button
                onClick={switchCamera}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
              >
                Switch Camera
              </button>
            </center>
          </div>
        </div>
      </center>
    </Base>
  );
};

export default QRCodeScanner;

