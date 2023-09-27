import { useState } from 'react'
import React from 'react'
import '@/assets/css/counter.css'
import { storage,db } from '../../../BE_FROMCHECKINV2/config/firebase';

function AddReward(){
    const [rewardName,setRewardName] =useState('');
    const [rewardImg,setRewardImg] =useState(null);
    const [rewardPrice,setRewardPrice] =useState(0);
    const [error,setError] =useState('');

    const types=['image/png', 'image/jpeg']

    const rewardImgHandler = (e) =>{
        let selectedFile = e.target.files[0];
        if (selectedFile&&types.includes(selectedFile.type)){
            setRewardImg(selectedFile);
            setError('');
    }
    else {
        setRewardImg(null);
        setError('Please select a valid image type PNG or JPEG');
    }
}
const addReward =(e) => {
    e.prevenDefault();
    // console.log(ItemImg,ItemName,ItemPrice);
    const uploadTask = storage.ref('reward-img/$(ItemImg.name)').put(ItemImg);
    uploadTask.on('state_changed',snapshot => {
        const progress = snapshot=(snapshot.bytesTransfer/snapshot.totalBytes)
    })
};
// https://youtu.be/mv4pIaZDNUw?si=-pnvIbebH-ONqLpR

    return (
        <dis className='container'>
            <br />
            <h2>ADD REWARD</h2>
            <hr />
            <form autoComplete="off" className='form-group' noSubmit={addReward}>
                <label htmlFor='reward-name'>Reward Name</label>
                <br />
                <input type='text' name='form-control' required
                onChange={(e)=>setRewardName(e.target.value)} value={rewardName}/>
                <br />
                <label htmlFor='reward-price'>Reward Price</label>
                <br />
                <input type='number' name='form-control' required
                onChange={(e)=>setRewardPrice(e.target.value)} value={rewardPrice}/>
                <br />
                <label htmlFor='reward-img'>Reward Image</label>
                <br />
                <input type='file' name='form-control' onChange={rewardImgHandler}></input>
                <br />
                <button className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error&&<span>{error}</span>}
        </dis>
    )
}
export default AddReward;