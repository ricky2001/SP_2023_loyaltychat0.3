import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Base from '@/layouts/base.jsx';
import axiosInstance from '../utils/api/axiosIntance.js';
import Swal from 'sweetalert2';
import { setEmail } from '@/stores/auth/index';
import { useSelector, useDispatch } from 'react-redux';

import './YouReward.css';

function YouReward() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authStore.email);
  const [emailUser, setEmailUser] = useState();
  const [rewardData, setRewardData] = useState([]);

  useEffect(() => {
    dispatch(setEmail());
  }, [dispatch]);

  useEffect(() => {
    setEmailUser(email);

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post('api/historyMR', { emailUse: email });
        if (response.data) {
          setRewardData(response.data);
        }
      } catch (error) {
        // console.error('Error fetching reward data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch reward data. Please try again.',
        });
      }
    };

    fetchData();
  }, [email]);

  const completeRewards = rewardData.filter((reward) => reward.status === 'Complete');
  const otherRewards = rewardData.filter((reward) => reward.status !== 'Complete');

  return (
    <Base>
    <br />
      <div className="you-reward-container">
        <div className='reward-card'>
          <h1>Your Reward History</h1>
        
        
        {completeRewards.length > 0 && (
          <>
            <h2>Complete Rewards</h2>
            <div className="card-container">
              {completeRewards.map((reward) => (
                <Card key={reward.id} className="reward-card">
                  <Card.Body>
                    <Card.Title>Name: {reward.name}</Card.Title>
                    <Card.Img variant="top" src={reward.img} className="item-image" />
                    <Card.Text>Date: {reward.date}</Card.Text>
                    <Card.Text>Item Name: {reward.itemname}</Card.Text>
                    <Card.Text>Item Total: {reward.itemtotal}</Card.Text>
                    <Card.Text className='status'>Status: {reward.status}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </>
        )}<br />

        {otherRewards.length > 0 && (
          <>
            <h2>Your Reward orders</h2>
            <div className="card-container">
              {otherRewards.map((reward) => (
                <Card key={reward.id} className="reward-card">
                  <Card.Body>
                    <Card.Title>Name: {reward.name}</Card.Title>
                    <Card.Img variant="top" src={reward.img} className="item-image" />
                    <Card.Text>Date: {reward.date}</Card.Text>
                    <Card.Text>Item Name: {reward.itemname}</Card.Text>
                    <Card.Text>Item Total: {reward.itemtotal}</Card.Text>
                    <Card.Text className='status'>Status: {reward.status}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </>
        )}
      </div></div>
    </Base>
  );
}

export default YouReward;