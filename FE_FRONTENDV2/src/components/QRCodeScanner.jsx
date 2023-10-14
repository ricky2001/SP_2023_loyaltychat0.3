import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { useSelector, useDispatch } from 'react-redux'
import { scanqrcode } from '@/stores/api/index'

function QRCodeScanner() {
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const navigate = useNavigate();
  let html5QrCodeScanner = null;
  
  const [isScanning, setIsScanning] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' for rear camera, 'user' for front camera

  const handleErrorWebCam = (error) => {
    console.error(error);
  };

  const startScanning = async () => {
    try {
      // Specify the id of the container element
      const containerId = 'qr-code-scanner-container';

      // Create the Html5Qrcode instance

      if (!html5QrCodeScanner) {
        html5QrCodeScanner = new Html5Qrcode(containerId);
      }

      await html5QrCodeScanner.start(
        { facingMode: facingMode }, // specify the camera configuration
        {
          fps: 10,
          qrbox: 250,
        },
        (qrCodeMessage) => {
          // Success callback function
          setScanResultWebCam(qrCodeMessage);
        }
      );

      try {
        const response = await fetch(scanqrcode(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ qrCodeMessage }),
        });if (response.ok) {
          // Handle successful API response here
          const data = await response.json();
          console.log('API Response:', data);
        } else {
          // Handle API error here
          console.error('API Error:', response.status);
        }
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    

      setIsScanning(true);
    } catch (error) {
      console.error(error);
    }
  };

  const [isNavigating, setIsNavigating] = useState(false);

  const navigateWithGuard = async (path) => {
    if (!isNavigating) {
      setIsNavigating(true);
      try {
        await navigate(path);
      } finally {
        setIsNavigating(false);
      }
    }
  };

  // In your stopScanning function, use navigateWithGuard instead of navigate
  const stopScanning = () => {
    if (isScanning && html5QrCodeScanner) {
      html5QrCodeScanner.stop().then(() => {
        html5QrCodeScanner.clear();
        setScanResultWebCam('');
        setIsScanning(false);

        navigateWithGuard('/calendar');
      });
    }
  };

  // const [scanqrcode, setscanqrcode] = useState([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fectchdata = dispatch(scanqrcode())
  //   console.log(fectchdata);
  // }, [dispatch])


  const switchCamera = () => {
    // Toggle between 'environment' and 'user' facing modes
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacingMode);

    stopScanning(); // Stop scanning when switching cameras

    // Start scanning with the new facing mode
    startScanning();
  };

  useEffect(() => {
    startScanning();

    return () => {
      if (isScanning) {
        stopScanning(); // Stop scanning and release resources when the component unmounts
      }
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="qr-code-scanner-container"></div>
      <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>

      <button onClick={stopScanning} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
        Stop Scanning
      </button>

      <button onClick={switchCamera} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
        Switch Camera
      </button>

      <Link to="/calendar">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Go Back to Another Page</button>
      </Link>
    </div>
  );
}

export default QRCodeScanner;
