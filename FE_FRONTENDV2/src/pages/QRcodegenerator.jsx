import QRCode from 'qrcode'
import { useState } from 'react'
// import './App.css'
// import './QRcodegenerator.css';
import Base from '@/layouts/base.jsx'
import { IoChevronBackSharp} from "react-icons/io5";
import { Link } from 'react-router-dom';


function QRcodegenerator() {
	const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')
	const h1Style = {
		fontWeight: 700, // Adjust the value to make the text thicker or thinner
	  };

	const GenerateQRCode = () => {
		QRCode.toDataURL(url, {
			width: 800,
			margin: 2,
			// color: {
			// 	dark: '#335383FF',
			// 	light: '#EEEEEEFF'
			// }
		}, (err, url) => {
			if (err) return console.error(err)

			console.log(url)
			setQr(url)
		})
	}

	return (
        <Base>
		<br></br>
		 <div className="flex items-center ml-2">
    {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
    
         <Link to="/form" className="flex items-center">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded-xl flex items-center">
          <IoChevronBackSharp style={{ marginRight: '3px'}}/>Back
          </button>
        </Link>
        </div>
		<center>
		<div className="QRcodegenerator">
			<div>
            <h1 style={h1Style}>Events QRcode</h1>
            </div><br/>
			<input 
				type="text"
				placeholder="e.g. https://google.com"
				value={url}
				onChange={e => setUrl(e.target.value)} /> &nbsp;
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded-xl " onClick={GenerateQRCode}>Generate</button>
			{qr && <>
				<img src={qr} />
				<a href={qr} download="qrcode.png">Download</a>
			</>}
			
		</div></center>
		</Base>
	)
}

export default QRcodegenerator