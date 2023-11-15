import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Form() {
  const [satisfactionLevel, setSatisfactionLevel] = useState(''); // State to store satisfaction level
  const [comments, setComments] = useState(''); // State to store user comments

  // Handle changes in the satisfaction level input
  const handleSatisfactionChange = (event) => {
    setSatisfactionLevel(event.target.value);
  };

  // Handle changes in the comments input
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // You can send the data to your server or perform other actions here
    console.log('Satisfaction Level:', satisfactionLevel);
    console.log('Comments:', comments);

    // Reset form fields
    setSatisfactionLevel('');
    setComments('');
  };

  return (
    <div>
      <h2>User Satisfaction Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="satisfactionLevel">Satisfaction Level:</label>
          <select
            id="satisfactionLevel"
            value={satisfactionLevel}
            onChange={handleSatisfactionChange}
            required
          >
            <option value="">Select</option>
            <option value="very-satisfied">Very Satisfied</option>
            <option value="satisfied">Satisfied</option>
            <option value="neutral">Neutral</option>
            <option value="dissatisfied">Dissatisfied</option>
            <option value="very-dissatisfied">Very Dissatisfied</option>
          </select>
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={handleCommentsChange}
          />
        </div>
        <div ><center>
        <Link to="/dashboard"><button type="cancel" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Cancel</button></Link>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Submit</button>
        </center>
        </div>
       
      </form>
    </div>
  );
}

export default Form;
