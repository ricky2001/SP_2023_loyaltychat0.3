import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { QrReader } from 'react-qr-reader';

function QRCodeScanner() {
    const [result, setResult] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const handleScan = (data) => {
        if (data) {
            setResult(data);
            // Perform any logic you need with the scanned data here
        }
    };

    const handleError = (error) => {
        console.error(error);
    };

    const handleClose = () => {
        setResult('');
        navigate('/'); // Use navigate to go back to the main page
    };

    return (
        <div>
            <h1>QR Code Scanner</h1>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan} // Use 'onScan' instead of 'onResult'
                style={{ width: '100%' }}
            />
            {result && (
                <div>
                    <p>Scanned QR code: {result}</p>
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
        </div>
    );
}

export default QRCodeScanner;