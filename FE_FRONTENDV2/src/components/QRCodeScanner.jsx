
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Link } from 'react-router-dom';
import {scanqrcode} from '@/stores/api/index'

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
