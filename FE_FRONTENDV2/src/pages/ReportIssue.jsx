// ReportIssue.jsx

import React, { useState } from 'react';
import Base from '../layouts/base';

const ReportIssue = () => {
    const [applicationIssue, setApplicationIssue] = useState('');

    // Assuming you have the admin email stored somewhere
    const adminEmail = 'admin@example.com';

    const handleIssueChange = (event) => {
        setApplicationIssue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Add your logic to handle the submission of the issue
        // For example, send a request to your server or perform any necessary actions
        console.log('Submitted issue:', applicationIssue);
    };

    return (
        <Base>
            <div className="max-w-md mx-auto p-4 border rounded shadow-md">
                <h2 className="text-lg font-semibold">Report Issues</h2>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="adminEmail" className="block mb-1">
                            Admin Email:
                        </label>
                        <input
                            type="text"
                            id="adminEmail"
                            name="adminEmail"
                            value={adminEmail}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-100 text-gray-500 border rounded focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
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
                        className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-green-600"
                    >
                        Submit Issue
                    </button>
                </form>
            </div>
        </Base>
    );
};

export default ReportIssue;
