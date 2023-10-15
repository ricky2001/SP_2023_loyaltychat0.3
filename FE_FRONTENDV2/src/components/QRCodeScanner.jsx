// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { QrReader } from 'react-qr-reader';

// function QRCodeScanner() {
//     const [result, setResult] = useState('');
//     const navigate = useNavigate(); // Use useNavigate hook for navigation

//     const handleScan = (data) => {
//         if (data) {
//             setResult(data);
//             // Perform any logic you need with the scanned data here
//         }
//     };

//     const handleError = (error) => {
//         console.error(error);
//     };

//     const handleClose = () => {
//         setResult('');
//         navigate('/'); // Use navigate to go back to the main page
//     };

//     return (
//         <div>
//             <h1>QR Code Scanner</h1>
//             <QrReader
//                 delay={300}
//                 onError={handleError}
//                 onScan={handleScan} // Use 'onScan' instead of 'onResult'
//                 style={{ width: '100%' }}
//             />
//             {result && (
//                 <div>
//                     <p>Scanned QR code: {result}</p>
//                     <button onClick={handleClose}>Close</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default QRCodeScanner;
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Html5Qrcode } from 'html5-qrcode';

// function QRCodeScanner() {
//   const [scanResultWebCam, setScanResultWebCam] = useState('');
//   const navigate = useNavigate();
//   let html5QrCodeScanner = null;
//   const [isScanning, setIsScanning] = useState(false);
//   const [facingMode, setFacingMode] = useState('environment'); // 'environment' for rear camera, 'user' for front camera

//   const handleErrorWebCam = (error) => {
//     console.error(error);
//   };

//   const startScanning = async () => {
//     try {
//       // Specify the id of the container element
//       const containerId = 'qr-code-scanner-container';

//       // Create the Html5Qrcode instance
      
//       if (!html5QrCodeScanner) {
//         html5QrCodeScanner = new Html5Qrcode(containerId);
//       }

//       await html5QrCodeScanner.start(
//         { facingMode: facingMode }, // specify the camera configuration
//         {
//           fps: 10,
//           qrbox: 250,
//         },
//         (qrCodeMessage) => {
//           // Success callback function
//           setScanResultWebCam(qrCodeMessage);
//         }
//       );

//       setIsScanning(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const [isNavigating, setIsNavigating] = useState(false);

// const navigateWithGuard = async (path) => {
//   if (!isNavigating) {
//     setIsNavigating(true);
//     try {
//       await navigate(path);
//     } finally {
//       setIsNavigating(false);
//     }
//   }
// };

// // In your stopScanning function, use navigateWithGuard instead of navigate
// const stopScanning = () => {
//   if (isScanning && html5QrCodeScanner) {
//     html5QrCodeScanner.stop().then(() => {
//       html5QrCodeScanner.clear();
//       setScanResultWebCam('');
//       setIsScanning(false);

//       navigateWithGuard('/calendar');
//     });
//   }
// };

  
  

//   const switchCamera = () => {
//     // Toggle between 'environment' and 'user' facing modes
//     const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
//     setFacingMode(newFacingMode);

//     stopScanning(); // Stop scanning when switching cameras

//     // Start scanning with the new facing mode
//     startScanning();
//   };

//   useEffect(() => {
//     startScanning();

//     return () => {
//       if (isScanning) {
//         stopScanning(); // Stop scanning and release resources when the component unmounts
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h1>QR Code Scanner</h1>
//       <div id="qr-code-scanner-container"></div>
//       <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>

//       <button onClick={stopScanning} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
//         Stop Scanning
//       </button>

//       <button onClick={switchCamera} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
//         Switch Camera
//       </button>

//       <Link to="/calendar">
//         <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Go Back to Another Page</button>
//       </Link>
//     </div>
//   );
// }

// export default QRCodeScanner;
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Link } from 'react-router-dom';

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const [scannedData, setScannedData] = useState('');
  // const [scanning, setScanning] = useState(true);

  useEffect(() => {
    // Initialize scanner and video input devices when the component mounts
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          codeReader.decodeFromVideoDevice(
            videoInputDevices[0].deviceId,
            videoRef.current,
            (result, error) => {
              if (result) {
                setScannedData(result.getText());
                // setScanning(false);
              } else if (error && error instanceof NotFoundException) {
                console.log('No QR code found.');
              }
            }
          );
        } else {
          console.error('No video input devices found.');
        }
      })
      .catch((err) => {
        console.error('Error accessing video devices:', err);
      });

    // Cleanup function: Reset the scanner when the component unmounts
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h2>QR Code Scanner</h2>
      
        <div>
          <video ref={videoRef} playsInline autoPlay muted />
          <p>Scanned QR Code: {scannedData}</p>
          <Link to="/calendar"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Go Back to Another Page</button></Link>
        </div>
       
    </div>
  );
};

export default QRCodeScanner;




