import React, { useState } from 'react';
import Base from '../layouts/base';
import axiosInstance from '../utils/api/axiosIntance.js';

const ReportIssue = () => {
  const [applicationIssue, setApplicationIssue] = useState('');
  const [email, setEmail] = useState('');

  const handleIssueChange = (event) => {
    setApplicationIssue(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post('/api/reportIssue', {
        message: applicationIssue,
        email: email,
      });

      console.log('Response:', response.data);

      if (response.status === 200) {
        console.log('Issue submitted successfully!');
        // Optionally, you can reset the form fields or navigate to a success page
        setApplicationIssue('');
        setEmail('');
      } else {
        console.error('Failed to submit issue.');
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
    }
  };

  return (
    <Base>
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold mb-10">Report Issues</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="adminEmail" className="block mb-1">
            From:
          </label>
          <input
            type="text"
            id="From"
            name="From"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 bg-gray-100 text-gray-500 border rounded focus:outline-none"
          />
        </div>

        <div className="mb-10">
          <label htmlFor="applicationIssue" className="block mb-1">
            Application Issues:
          </label>
          <textarea
            id="applicationIssue"
            name="applicationIssue"
            value={applicationIssue}
            onChange={handleIssueChange}
            className="w-full px-3 py-2 border rounded focus:outline-none"
            style={{ minHeight: '100px' }}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-green-600 mb-10 mx-auto"
        >
          Submit Issue
        </button>
      </form>
    </div>
    </Base>
  );
};

export default ReportIssue;
